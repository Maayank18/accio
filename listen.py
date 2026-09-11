"""
accio - Step 1 proof of concept

Speech-to-text model history:
- recognize_google (free API, no local size) -- dropped: rate-limited under
  heavy use, requires internet
- Whisper base (0.14GB) -- dropped: weak accuracy on casual/filler speech
- Whisper large-v3 (2.88GB) -- dropped: ~3 min load time on CPU, unusable
  for repeated use
- Vosk small-en-us-0.15 (0.07GB) -- dropped: inaccurate across the board,
  not just short commands -- long test phrases were also garbled regardless
  of how clearly spoken
- Parakeet TDT 0.6B v3, multilingual, fp32 (2.37GB) -- dropped: language
  auto-detection misfired on short phrases, transcribing English as
  Cyrillic text
- Parakeet TDT 0.6B v2, English-only, int8 (0.63GB) -- CURRENT: fast load,
  accurate on both short commands and long/casual sentences in testing

Not yet tried (noted for later):
- Moonshine Hindi (~0.03GB) -- unofficial, unverified third-party
  fine-tune, real risk
- Parakeet 1.1B RNNT Multilingual, Hindi-capable (~2x current model's
  size) -- built for GPU/NIM infrastructure, CPU performance unconfirmed
- sherpa-onnx-streaming-zipformer-en-2023-06-26 (~75MB total: encoder,
  decoder, joiner) -- a genuinely different model architecture (streaming
  Zipformer, not Parakeet) built specifically for true word-by-word live
  streaming. This is the real path to true streaming, if we pursue it --
  untested against our accuracy needs, would need its own dedicated test.

Known shortcoming: current model is English-only. Hindi+English code-switching
support (per project research) is not yet solved -- needs further research,
see options above.

STREAMING MODE: not supported by this file, and staying that way for now.
Two things were tested and rejected:
1. True word-by-word streaming would require switching to a different model
   architecture entirely (sherpa-onnx-streaming-zipformer-en-2023-06-26,
   see above) -- a real rebuild, not attempted yet.
2. VAD-chunked pseudo-streaming (Silero VAD via onnx_asr's with_vad()) was
   built and tested directly. Result: rejected. It did not provide live
   responsiveness in practice (the audio is still captured in full before
   any chunk processing starts, so chunks appear all at once, not as you
   pause), AND it measurably reduced transcription accuracy compared to
   plain batch mode -- e.g. "Open chrome" (correct in batch mode,
   repeatedly) became "And One? But all." under VAD chunking, and longer
   sentences came out more fragmented and error-prone. Not used going
   forward.

Current tuning values (adjust here if behavior needs to change):
- timeout=30            -- seconds to wait for speech to START before giving up
- phrase_time_limit=60  -- max seconds of recording once speech starts
- pause_threshold=3.0   -- seconds of silence before assuming you're done
  talking (default is 0.8s, too short and cuts off mid-sentence pauses)

These three will likely need to increase further once real user research is
done: a user explaining a multi-step request (e.g. why they want to book an
Aadhaar appointment) may need more time to give context than a short test
phrase does, and some users may need more thinking time before starting to
speak at all. Revisit these values after user testing, not just our own.
"""

import speech_recognition as sr
import onnx_asr
import numpy as np
import io
import soundfile as sf

print("Loading Parakeet model into memory...")
model = onnx_asr.load_model("nemo-parakeet-tdt-0.6b-v2", quantization="int8")
print("Model loaded.")

def listen_and_transcribe():
    recognizer = sr.Recognizer()
    recognizer.pause_threshold = 3.0

    with sr.Microphone(sample_rate=16000) as source:
        print("Adjusting for ambient noise, please wait...")
        recognizer.adjust_for_ambient_noise(source, duration=1)

        print("Listening... say something.")
        try:
            audio = recognizer.listen(source, timeout=30, phrase_time_limit=60)
        except sr.WaitTimeoutError:
            print("No speech detected within 30 seconds. Try again.")
            return

    print("Transcribing...")

    audio_data = audio.get_wav_data()
    audio_np, sample_rate = sf.read(io.BytesIO(audio_data))
    audio_np = audio_np.astype(np.float32)

    text = model.recognize(audio_np, sample_rate=sample_rate)
    text = text.strip()

    if text:
        print(f"You said: {text}")
    else:
        print("Could not understand audio. Try speaking clearly and try again.")

if __name__ == "__main__":
    listen_and_transcribe()