"""
accio - Step 1 proof of concept
Listens to the microphone once, converts speech to text, prints it.
"""

import speech_recognition as sr

def listen_and_transcribe():
    recognizer = sr.Recognizer()

    with sr.Microphone() as source:
        print("Adjusting for ambient noise, please wait...")
        recognizer.adjust_for_ambient_noise(source, duration=1)

        print("Listening... say something.")
        audio = recognizer.listen(source)

    print("Transcribing...")
    try:
        text = recognizer.recognize_google(audio)
        print(f"You said: {text}")
    except sr.UnknownValueError:
        print("Could not understand audio. Try speaking clearly and try again.")
    except sr.RequestError as e:
        print(f"Could not reach the speech recognition service: {e}")

if __name__ == "__main__":
    listen_and_transcribe()