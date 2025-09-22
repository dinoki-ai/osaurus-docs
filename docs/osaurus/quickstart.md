---
title: Quickstart
sidebar_label: Quickstart
description: Download, run, and call the Osaurus API in minutes.
---

## Download

Grab the latest signed build from the Releases page:
https://github.com/dinoki-ai/osaurus/releases/latest

## Build and run (from source)

1. Open `osaurus.xcodeproj` in Xcode 16.4+
2. Build and run the `osaurus` target
3. In the UI, set the port (default `8080`) via the gear icon and press Start
4. Open the model manager to download a model (e.g., “Llama 3.2 3B Instruct 4bit”)

Models are stored by default at `~/MLXModels`. Override with the env var `OSU_MODELS_DIR`.

## Use the API

- Base URL: `http://127.0.0.1:8080` (or your chosen port)
- All endpoints also accept common API prefixes (`/v1`, `/api`, `/v1/api`)

List models (OpenAI-compatible):

```bash
curl -s http://127.0.0.1:8080/v1/models | jq
```

List tags (Ollama-compatible):

```bash
curl -s http://127.0.0.1:8080/v1/tags | jq
```

Non-streaming chat completion:

```bash
curl -s http://127.0.0.1:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
        "model": "llama-3.2-3b-instruct-4bit",
        "messages": [{"role":"user","content":"Write a haiku about dinosaurs"}],
        "max_tokens": 200
      }'
```

Streaming chat completion (SSE format for `/chat/completions`):

```bash
curl -N http://127.0.0.1:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
        "model": "llama-3.2-3b-instruct-4bit",
        "messages": [{"role":"user","content":"Summarize Jurassic Park in one paragraph"}],
        "stream": true
      }'
```

Ollama-compatible streaming (NDJSON format for `/chat`):

```bash
curl -N http://127.0.0.1:8080/v1/api/chat \
  -H "Content-Type: application/json" \
  -d '{
        "model": "llama-3.2-3b-instruct-4bit",
        "messages": [{"role":"user","content":"Tell me about dinosaurs"}],
        "stream": true
      }'
```

Tip: Model names are lower-cased with hyphens (e.g., `Llama 3.2 3B Instruct 4bit` → `llama-3.2-3b-instruct-4bit`).

