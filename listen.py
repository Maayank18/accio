"""
accio - Step 1 proof of concept (v4)
Listens to the microphone once, converts speech to text using local Vosk, prints it.
Runs fully offline. Vosk is small and loads almost instantly, unlike Whisper large-v3.
"""

import speech_recognition as sr
import vosk
import json

# Path to the downloaded Vosk model folder (see setup instructions below).
# "small" English model is a good starting point -- fast, small, offline.
MODEL_PATH = "vosk-model-small-en-us-0.15"

print("Loading Vosk model into memory...")
model = vosk.Model(MODEL_PATH)
print("Model loaded.")

def listen_and_transcribe():
    recognizer = sr.Recognizer()

    with sr.Microphone(sample_rate=16000) as source:
        print("Adjusting for ambient noise, please wait...")
        recognizer.adjust_for_ambient_noise(source, duration=1)

        print("Listening... say something.")
        try:
            audio = recognizer.listen(source, timeout=15, phrase_time_limit=30)
        except sr.WaitTimeoutError:
            print("No speech detected within 15 seconds. Try again.")
            return

    print("Transcribing...")

    # Vosk wants raw 16-bit PCM audio data, not a WAV file object.
    # get_raw_data() gives us exactly that, and we tell the mic to record
    # at 16000Hz directly above, so no resampling step is needed here
    # (unlike the Whisper version, which needed librosa to resample).
    raw_audio = audio.get_raw_data(convert_rate=16000, convert_width=2)

    vosk_recognizer = vosk.KaldiRecognizer(model, 16000)
    vosk_recognizer.AcceptWaveform(raw_audio)

    # Vosk returns a JSON string; the actual transcribed text is under the "text" key.
    result = json.loads(vosk_recognizer.FinalResult())
    text = result.get("text", "").strip()

    if text:
        print(f"You said: {text}")
    else:
        print("Could not understand audio. Try speaking clearly and try again.")

if __name__ == "__main__":
    listen_and_transcribe()