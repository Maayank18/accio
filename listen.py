"""
accio - Step 1 proof of concept (v5)
Listens to the microphone once, converts speech to text using NVIDIA Parakeet
(via onnx-asr, CPU-optimized), prints it.
Runs fully offline after the first model download.
English only for now -- Hindi support is a stated v2 direction (see README).
"""

import speech_recognition as sr
import onnx_asr
import numpy as np
import io
import soundfile as sf

print("Loading Parakeet model into memory...")
# Using the v2 (English-only) model instead of v3 (multilingual) --
# v3's automatic language detection was misfiring on short phrases like
# "open Chrome," occasionally transcribing them as Russian/Cyrillic text.
# v2 has no language to guess, since it's English-only, which removes
# that failure mode entirely.
# quantization="int8" pulls a smaller (~625MB vs ~2.3GB), faster-downloading
# version of the same model. Confirmed accuracy is unchanged from the
# full-size version -- this is a real, documented option, not a shortcut.
model = onnx_asr.load_model("nemo-parakeet-tdt-0.6b-v2", quantization="int8")
print("Model loaded.")

def listen_and_transcribe():
    recognizer = sr.Recognizer()
    # How long a silence must last before the recognizer decides you've
    # finished speaking and stops recording. Default is 0.8s, which is
    # short enough to cut you off mid-sentence during a normal thinking
    # pause. Raised here to give more natural room to pause and continue.
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

    # Parakeet (via onnx-asr) expects a numpy float32 array, 16kHz mono --
    # same requirement as Whisper had, so we reuse the same conversion approach.
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