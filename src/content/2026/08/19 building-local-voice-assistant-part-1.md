---
date: 2026-08-19
---

::post-title{:date="date"}
# Building Local Voice Assistant - Part 1
::

<br/>

Considering LLM has matured considerably, I think voice assistant should have improved significantly and indeed it is. And I have been wondering if I can create one and run it locally on my machine. So, today is my first attempt.

<br/>

I started with a quick search and decided to try Hugging Face Audio Course, especially on [Creating a voice assistant](https://huggingface.co/learn/audio-course/en/chapter7/voice-assistant){.text-blue-600}. It is well-written but there are a few missing steps (part of the fun) and some parts need an update. My starting tools are:
- Macbook Pro (M3 Pro) with 36GB of RAM
- VS Code
- Homebrew
- Experience in Python

<br/>

::section-title
## Step 1: Install uv
::

Following the article, I installed uv ([https://docs.astral.sh/uv/]{.text-blue-600}) which is a very fast Python package manager by running: `brew install uv`{.bg-gray-200 .p-2 .rounded}

<br/>

::section-title
## Step 2: Create a project directory
::

Since some tools need a virtual environment, so I opened a terminal and run `mkdir voice-assistant`{.bg-gray-200 .p-2 .rounded} to create a directory. Since I already have a VS Code installed, I can open the new directory in VS Code by running `code voice-assistant`{.bg-gray-200 .p-2 .rounded}.

<br/>

::section-title
## Step 3: Create a Python virtual environment and activate
::

At this point, I'm inside VS Code. To create a virtual environment, I first launched terminal inside VS Code by pressing ``Ctrl + ` ``{.bg-gray-200 .p-2 .rounded}, and then run:

::code-block
```
uv venv .env --python 3.11
```
::

The command above will create a virtual environment with name ".env" and install Python 3.11 if it's not already installed. Then we need to activate the virtual environment. Typically, running the following is sufficient in the terminal:

::code-block
```
.env/bin/activate
```
::

But since the activate file must be sourced, I need to prefix it with "source" or another ".", so inside VS code, run:

::code-block
```
. .env/bin/activate
```
::

<br/>

::section-title
## Step 4: Create a python file/module and install dependencies/packages
::

You are welcomed to follow the article in Hugging Face, which provides a step-by-step approach and better explanation. But since this post is about my experience, I will provide all the commands I ran. I created a file named `main.py`{.bg-gray-200 .p-2 .rounded} and then install the following Python packages:

::code-block
```
// CPU only transformers since I don't have NVIDIA GPU
uv pip install torch --index-url https://download.pytorch.org/whl/cpu
uv pip install transformers
uv pip install requests
uv pip install lmstudio
uv pip install ipython jupyter
uv pip install sentencepiece
uv pip install datasets=3.6.0 // 4.0.0 will throw an error
```
::

<br/>

::section-title
## Step 5: Install LM Studio and download model for inference
::

The Hugging Face article will use remote hosted model for inference, but in my case, I want to run all in my machine, so I install LM Studio and in the code, I changed the query function to call the locally hosted model.

::code-block
```
brew install lm-studio --cask
```
::

Running LM Studio, I downloaded `Gemma 4 12B`{.bg-gray-200 .p-2 .rounded} model. Then to accept request through api call, I have to enable LM Studio Local Server which can be done by running `lms server start`{.bg-gray-200 .p-2 .rounded} or simply flipping the switch under Local Server inside LM Studio UI:

![LM Studio Local Server](/lm-studio-local-server.png)

<br/>

::section-title
## Step 6: Install ffmpeg
::

On my Macbook, the ffmpeg is required but it is missing, so I have to install it with:

::code-block
```
brew install ffmpeg
```
::

<br/>

::section-title
## Step 7: Install Jupyter extension for VS Code
::

I was running my code in terminal, but the last step which is text-to-speech code will generate an HTML 5 audio player widget which means it's better to run the code in Jupyter notebook. However, there's a quick workaround without copying the code over by installing the Jupyter extension for VS Code [https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter]{.text-blue-600}. This enables interactive window: [https://code.visualstudio.com/docs/python/jupyter-support-py#_using-the-python-interactive-window]{.text-blue-600}.

<br/>

::section-title
## Step 8: Code
::

Finally, we need to code. Here's my version of main.py:

::code-block
```
from transformers import pipeline
import torch
from transformers.pipelines.audio_utils import ffmpeg_microphone_live
import sys
import requests
import json
import lmstudio as lms
from transformers import SpeechT5Processor, SpeechT5ForTextToSpeech, SpeechT5HifiGan
from datasets import load_dataset
from IPython.display import Audio

device = "cuda:0" if torch.cuda.is_available() else "cpu"

classifier = pipeline(
    "audio-classification", model="MIT/ast-finetuned-speech-commands-v2", device=device
)

def launch_fn(
    wake_word="marvin",
    prob_threshold=0.5,
    chunk_length_s=2.0,
    stream_chunk_s=0.25,
    debug=False,
):
    if wake_word not in classifier.model.config.label2id.keys():
        raise ValueError(
            f"Wake word {wake_word} not in set of valid class labels, pick a wake word in the set {classifier.model.config.label2id.keys()}."
        )

    sampling_rate = classifier.feature_extractor.sampling_rate

    mic = ffmpeg_microphone_live(
        sampling_rate=sampling_rate,
        chunk_length_s=chunk_length_s,
        stream_chunk_s=stream_chunk_s,
    )

    print("Listening for wake word...")
    for prediction in classifier(mic):
        prediction = prediction[0]
        if debug:
            print(prediction)
        if prediction["label"] == wake_word:
            if prediction["score"] > prob_threshold:
                return True

transcriber = pipeline(
    "automatic-speech-recognition", model="openai/whisper-base.en", device=device
)

def transcribe(chunk_length_s=5.0, stream_chunk_s=3.0):
    sampling_rate = transcriber.feature_extractor.sampling_rate

    mic = ffmpeg_microphone_live(
        sampling_rate=sampling_rate,
        chunk_length_s=chunk_length_s,
        stream_chunk_s=stream_chunk_s,
    )

    print("Start speaking...")
    for item in transcriber(mic, generate_kwargs={"max_new_tokens": 128}):
        sys.stdout.write("\033[K")
        print(item["text"], end="\r")
        if not item["partial"][0]:
            break

        return item["text"]

def query(text, model_id="google/gemma-4-12b"):
    model = lms.llm(model_id)
    return model.respond(text).content

processor = SpeechT5Processor.from_pretrained("microsoft/speecht5_tts")
model = SpeechT5ForTextToSpeech.from_pretrained("microsoft/speecht5_tts").to(device)
vocoder = SpeechT5HifiGan.from_pretrained("microsoft/speecht5_hifigan").to(device)
embeddings_dataset = load_dataset("Matthijs/cmu-arctic-xvectors", split="validation")
speaker_embeddings = torch.tensor(embeddings_dataset[7306]["xvector"]).unsqueeze(0)

def synthesize(text):
    inputs = processor(text=text, return_tensors="pt")
    speech = model.generate_speech(
        inputs["input_ids"].to(device), speaker_embeddings.to(device), vocoder=vocoder
    )
    return speech.cpu()

# launch_fn(debug=True)
launch_fn()
transcription = transcribe()
print(f"Transcription: {transcription}")
response = query(transcription)
print(f"Response: {response}")
audio = synthesize(response)

#%%
Audio(audio, rate=16000, autoplay=True)
```
::

::section-title
## Step 9: Prepare to run
::

To run the code, first, we need to select a kernel for the interactive window. To create the interactive window, with main.py active, open command pallete by using `Ctrl + Shift + P`{.bg-gray-200 .p-2 .rounded} in VS Code, then select **Jupyter: Run Current File in Python Interactive Window**. If no kernel is set yet, interactive window will prompt us to select a kernel, so we just need to follow the instruction. In my case, I selected Python 3.11, since the code was compatible with datasets 3.6.0 and Python 3.11.

::section-title
## Step 10: Run and tweak
::

To actual run the code, I find it easiest to right click on the file and select **Run Current File in Interactive Window**. This will do the following:

1. Download all the required models for various tasks.
2. At runtime, VS code will need permission to use mic on your device. Once permission is allowed, also check if mic is not muted.
3. Listening to wake word. Following HF article, it will be "Marvin".
4. Saying "Marvin" will activate the actual listening, so say something like "What's the capital city of US?" (my test phrase). Sometimes, it doesn't get it right and pick up noise. I find it better when I selected "Voice Isolation" mode. There should an orange mic icon on the top right menu bar where we can change the Mic Mode.
5. After listening, transcribed word will be sent to LM Studio (keep the server running) typically at "http://localhost:1234".
6. The response will then be synthesized into audio.
7. Hit play on the generated widget in interactive window will play the audio. I find the autoplay doesn't work even though it is set to true.
8. Also, Gemma by default has `Enable Thinking` set to true, so the respond tends to come with reason. It can be turned off in LM Studio under `Inference > Custom Fields > Enable Thinking`. Turning thinking off will result in "cleaner" respond. Also, I noticed it breaks when the response is big.

![LM Studio Enable Thinking](/lm-studio-enable-thinking.png)

<br/>

That's as far as I get in one day. If you are giving it at try, let me know in [LinkedIn](https://www.linkedin.com/in/nikkiyodo/){.text-blue-600} how it goes. My next step is to tweak it so it is more reliable, support conversation mode, etc.
