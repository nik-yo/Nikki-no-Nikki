---
date: 2026-03-04
---

::post-title{:date="date"}
# Running Coding AI Agent Locally
::

I was wondering if there's a decent AI agent that helped with coding but can be run locally. After a quick test, I managed to get it to work with the following stack:

- Ollama
- DeepSeek Coder
- Continue VS Code Extension
- VS Code

To set it up, I follow the steps below:

1. First, I install Ollama on my machine using winget: `winget install Ollama.Ollama`{.bg-gray-200 .p-2 .rounded}.

2. Then, download DeepSeek Coder to run in Ollama. [https://ollama.com/library/]{.text-blue-600}. In my case, I just use the smallest model which is 1.3b paramaters: `ollama run deepseek-coder:1.3b`{.bg-gray-200 .p-2 .rounded}.

3. Next, I search for and install "Continue" VS Code extension by continue.dev.

4. To configure the extension, make sure Ollama is running on http://localhost:11434. If it's not, run `ollama serve`{.bg-gray-200 .p-2 .rounded}.

5. In my case, the "Continue" extension was unable to detect Ollama. I had to setup the configuration to autodetect. To do that, I open the Configs menu of the extension. Click the setting/gear icon next to Local Config and paste the following config:

::code-block
```
name: Local Config
version: 1.0.0
schema: v1
models:
  - name: Autodetect
    provider: ollama
    model: AUTODETECT
    roles:
      - chat
      - edit
      - apply
      - rerank
      - autocomplete
```
::

Then, the LLM works locally, but it will use a lot of CPU and memory.