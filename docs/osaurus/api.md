---
title: API
sidebar_label: API
description: Endpoints, path normalization, and function/tool calling.
---

## Endpoints

- `GET /` → Plain text status
- `GET /health` → JSON health info
- `GET /models` → OpenAI-compatible models list
- `GET /tags` → Ollama-compatible models list
- `POST /chat/completions` → OpenAI-compatible chat completions
- `POST /chat` → Ollama-compatible chat endpoint

### Path normalization

All endpoints support common prefixes (`/v1`, `/api`, `/v1/api`). Examples:

- `/v1/models` → `/models`
- `/api/chat/completions` → `/chat/completions`
- `/api/chat` → `/chat` (Ollama-style)

## Function/Tool Calling (OpenAI-compatible)

Send `tools` and optional `tool_choice` in your request. The model is prompted to return an exact JSON `tool_calls` object; Osaurus parses it (tolerates code fences or minor formatting noise) and streams deltas when `stream: true`.

Example (let the model decide: `tool_choice: "auto"`):

```bash
curl -s http://127.0.0.1:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
        "model": "llama-3.2-3b-instruct-4bit",
        "messages": [
          {"role":"system","content":"You can call functions to answer queries succinctly."},
          {"role":"user","content":"What\'s the weather in SF?"}
        ],
        "tools": [
          {
            "type": "function",
            "function": {
              "name": "get_weather",
              "description": "Get weather by city name",
              "parameters": {
                "type": "object",
                "properties": {"city": {"type": "string"}},
                "required": ["city"]
              }
            }
          }
        ],
        "tool_choice": "auto"
      }'
```

Then continue the conversation with a `tool` role message:

```bash
curl -s http://127.0.0.1:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
        "model": "llama-3.2-3b-instruct-4bit",
        "messages": [
          {"role":"user","content":"What\'s the weather in SF?"},
          {"role":"assistant","content":"","tool_calls":[{"id":"call_1","type":"function","function":{"name":"get_weather","arguments":"{\"city\":\"SF\"}"}}]},
          {"role":"tool","tool_call_id":"call_1","content":"{\"tempC\":18,\"conditions\":\"Foggy\"}"}
        ]
      }'
```

Notes

- Only `type: "function"` tools are supported.
- Assistant `arguments` should be a JSON-escaped string; nested `parameters` objects are normalized.
- Streaming deltas include tool call id, type, name, and chunked arguments, ending with `finish_reason: "tool_calls"` and `[DONE]`.

