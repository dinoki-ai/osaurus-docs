---
title: Apple Intelligence
sidebar_label: Apple Intelligence
description: Deep dive into Apple Foundation Models support in Osaurus.
slug: /models/apple-intelligence
---

Osaurus integrates with Apple Foundation Models when available on your system, giving you access to the system default on‑device language model with zero configuration.

## Requirements

- macOS 26 (Tahoe) on Apple Silicon (M‑series)
- Apple Foundation Models available on your system (provided by macOS)

Osaurus automatically detects availability at startup. When supported, the models list includes a virtual entry named `foundation` representing the system default model. You can also select it via `model: "default"` (alias).

## Setup

1. Update to macOS 26 (Tahoe) on an Apple Silicon Mac (M‑series).
2. Install or open Osaurus and start the server (default port `1337`).
3. Verify support by listing models:

   ```bash
   curl -s http://127.0.0.1:1337/v1/models | jq
   ```

   Look for a `foundation` entry.

4. Use `model: "foundation"` (or `"default"`) in your requests.
5. Optional: Use OpenAI‑style tools; Osaurus will map them to Apple’s tool interface.

## Detect support

List models and check for a `foundation` entry:

```bash
curl -s http://127.0.0.1:1337/v1/models | jq
```

If `foundation` is present, your system can serve Apple Foundation Models via Osaurus.

## Use with the API

Non‑streaming chat completion using the system model:

```bash
curl -s http://127.0.0.1:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
        "model": "foundation",
        "messages": [{"role":"user","content":"Write a haiku about dinosaurs"}],
        "max_tokens": 200
      }'
```

Streaming with the default system model (alias):

```bash
curl -N http://127.0.0.1:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
        "model": "default",
        "messages": [{"role":"user","content":"Summarize Jurassic Park in one paragraph"}],
        "stream": true
      }'
```

All standard path prefixes are supported (e.g., `/v1`, `/api`, `/v1/api`).

## Function/Tool calling

When you request `model: "foundation"` (or `"default"`) on supported systems, Osaurus maps OpenAI‑style tools to Apple Foundation Models' tool interface. In streaming mode, Osaurus emits OpenAI‑style `tool_calls` deltas so existing client code continues to work.

Notes:

- Only `type: "function"` tools are supported
- Assistant `arguments` must be a JSON‑escaped string in non‑stream responses; chunked during streaming

## Performance

On supported hardware, Apple Foundation Models may use Apple Neural Engine (ANE) acceleration. Exact behavior depends on the model and macOS version.

## Error behavior and detection

- If Apple Foundation Models are not available, requests with `model: "foundation"` or `"default"` will return an error
- Use `/v1/models` to detect support before selecting `foundation`

## Privacy

All inference happens locally on your Mac. No requests are sent to external services by Osaurus.

## Troubleshooting

### `foundation` not in `/v1/models`

- Ensure you are on macOS 15.5+ and running on Apple Silicon.
- Restart Osaurus after updating macOS.
- Confirm you’re querying the correct server/port (default `http://127.0.0.1:1337`).

### Error when using `model: "foundation"` / `"default"`

- AFM may not be available on your system version; fall back to an MLX model.
- Verify detection via `/v1/models`.

### Slow or no output

- Try a shorter prompt first; reduce `max_tokens`.
- Close other heavy apps to free CPU/GPU/ANE resources.
- Check the Osaurus app’s status and logs.
