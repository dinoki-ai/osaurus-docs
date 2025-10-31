---
title: API Reference
sidebar_label: API
description: Complete API documentation for Osaurus endpoints
sidebar_position: 5
---

# API Reference

Osaurus provides OpenAI-compatible and Ollama-compatible APIs for seamless integration with existing tools and libraries.

## Base URL

```
http://127.0.0.1:1337
```

All endpoints support common API prefixes for compatibility:

- `/v1/endpoint` — OpenAI style
- `/api/endpoint` — Generic style
- `/v1/api/endpoint` — Combined style

## Endpoints Overview

| Endpoint               | Method | Description                    |
| ---------------------- | ------ | ------------------------------ |
| `/`                    | GET    | Server status (plain text)     |
| `/health`              | GET    | Health check (JSON)            |
| `/v1/models`           | GET    | List available models (OpenAI) |
| `/api/tags`            | GET    | List available models (Ollama) |
| `/v1/chat/completions` | POST   | Chat completion (OpenAI)       |
| `/api/chat`            | POST   | Chat completion (Ollama)       |

## Endpoint Details

### GET /

Simple status check returning plain text.

**Response:**

```
Osaurus is running
```

### GET /health

Health check endpoint returning JSON status.

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-03-15T10:30:45Z"
}
```

### GET /v1/models

List all available models in OpenAI format.

**Response:**

```json
{
  "object": "list",
  "data": [
    {
      "id": "llama-3.2-3b-instruct-4bit",
      "object": "model",
      "created": 1234567890,
      "owned_by": "osaurus"
    },
    {
      "id": "foundation",
      "object": "model",
      "created": 1234567890,
      "owned_by": "apple"
    }
  ]
}
```

### GET /api/tags

List all available models in Ollama format.

**Response:**

```json
{
  "models": [
    {
      "name": "llama-3.2-3b-instruct-4bit",
      "size": 2147483648,
      "digest": "sha256:abcd1234...",
      "modified_at": "2024-03-15T10:30:45Z"
    }
  ]
}
```

### POST /v1/chat/completions

Create a chat completion using OpenAI format.

**Request Body:**

```json
{
  "model": "llama-3.2-3b-instruct-4bit",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ],
  "max_tokens": 1000,
  "temperature": 0.7,
  "top_p": 0.9,
  "stream": false,
  "tools": []
}
```

**Parameters:**

| Parameter     | Type          | Required | Description                                |
| ------------- | ------------- | -------- | ------------------------------------------ |
| `model`       | string        | Yes      | Model ID to use                            |
| `messages`    | array         | Yes      | Array of message objects                   |
| `max_tokens`  | integer       | No       | Maximum tokens to generate (default: 2048) |
| `temperature` | float         | No       | Sampling temperature 0-2 (default: 0.7)    |
| `top_p`       | float         | No       | Nucleus sampling threshold (default: 0.9)  |
| `stream`      | boolean       | No       | Enable SSE streaming (default: false)      |
| `tools`       | array         | No       | Function/tool definitions                  |
| `tool_choice` | string/object | No       | Tool selection strategy                    |

**Response (Non-streaming):**

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "llama-3.2-3b-instruct-4bit",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "I'm doing well, thank you! How can I help you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 15,
    "total_tokens": 40
  }
}
```

**Response (Streaming):**

```
data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1234567890,"model":"llama-3.2-3b-instruct-4bit","choices":[{"index":0,"delta":{"role":"assistant"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1234567890,"model":"llama-3.2-3b-instruct-4bit","choices":[{"index":0,"delta":{"content":"I'm"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1234567890,"model":"llama-3.2-3b-instruct-4bit","choices":[{"index":0,"delta":{"content":" doing"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1234567890,"model":"llama-3.2-3b-instruct-4bit","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}

data: [DONE]
```

### POST /api/chat

Create a chat completion using Ollama format.

**Request Body:**

```json
{
  "model": "llama-3.2-3b-instruct-4bit",
  "messages": [
    {
      "role": "user",
      "content": "Why is the sky blue?"
    }
  ],
  "stream": false,
  "options": {
    "temperature": 0.7,
    "top_p": 0.9,
    "num_predict": 1000
  }
}
```

**Parameters:**

| Parameter  | Type    | Required | Description                       |
| ---------- | ------- | -------- | --------------------------------- |
| `model`    | string  | Yes      | Model name to use                 |
| `messages` | array   | Yes      | Array of message objects          |
| `stream`   | boolean | No       | Enable streaming (default: false) |
| `options`  | object  | No       | Model parameters                  |

**Options Object:**

| Option        | Type    | Description                |
| ------------- | ------- | -------------------------- |
| `temperature` | float   | Sampling temperature (0-2) |
| `top_p`       | float   | Nucleus sampling threshold |
| `num_predict` | integer | Max tokens to generate     |

**Response:**

```json
{
  "model": "llama-3.2-3b-instruct-4bit",
  "created_at": "2024-03-15T10:30:45Z",
  "message": {
    "role": "assistant",
    "content": "The sky appears blue due to a phenomenon called Rayleigh scattering..."
  },
  "done": true,
  "total_duration": 1234567890,
  "load_duration": 123456789,
  "prompt_eval_duration": 12345678,
  "eval_duration": 234567890,
  "eval_count": 85
}
```

## Function Calling

Osaurus supports OpenAI-style function calling for structured interactions.

### Basic Function Call

```json
{
  "model": "llama-3.2-3b-instruct-4bit",
  "messages": [
    {
      "role": "user",
      "content": "What's the weather in San Francisco?"
    }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "Get the current weather in a location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "The city and state"
            },
            "unit": {
              "type": "string",
              "enum": ["celsius", "fahrenheit"]
            }
          },
          "required": ["location"]
        }
      }
    }
  ]
}
```

### Response with Tool Call

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "llama-3.2-3b-instruct-4bit",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": null,
        "tool_calls": [
          {
            "id": "call_abc123",
            "type": "function",
            "function": {
              "name": "get_weather",
              "arguments": "{\"location\":\"San Francisco, CA\",\"unit\":\"fahrenheit\"}"
            }
          }
        ]
      },
      "finish_reason": "tool_calls"
    }
  ]
}
```

### Tool Choice Options

- `"auto"` — Model decides whether to use tools (default)
- `"none"` — Disable tool usage
- `{"type": "function", "function": {"name": "function_name"}}` — Force specific function

## Authentication

Osaurus does not require authentication by default. When using SDK clients, you can pass any value for the API key:

```python
client = OpenAI(
    base_url="http://127.0.0.1:1337/v1",
    api_key="not-needed"
)
```

## Error Handling

Errors follow the OpenAI error format:

```json
{
  "error": {
    "message": "Model not found: gpt-4",
    "type": "invalid_request_error",
    "code": "model_not_found"
  }
}
```

**Common Error Codes:**

| Code                      | Description                          |
| ------------------------- | ------------------------------------ |
| `model_not_found`         | Requested model doesn't exist        |
| `invalid_request`         | Malformed request body               |
| `context_length_exceeded` | Input exceeds model's context window |
| `rate_limit_exceeded`     | Too many concurrent requests         |
| `internal_server_error`   | Server-side error                    |

## CORS Support

Osaurus includes built-in CORS support for browser-based applications:

- **Allowed Origins:** `*` (all origins)
- **Allowed Methods:** `GET, POST, OPTIONS`
- **Allowed Headers:** `Content-Type, Authorization`

## Rate Limiting

Default limits per model:

- **Concurrent Requests:** 10
- **Requests per Minute:** 100
- **Max Context Length:** Model-dependent (typically 2048-4096 tokens)

## SDK Examples

### Python (OpenAI SDK)

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://127.0.0.1:1337/v1",
    api_key="not-needed"
)

response = client.chat.completions.create(
    model="llama-3.2-3b-instruct-4bit",
    messages=[
        {"role": "user", "content": "Explain quantum computing"}
    ],
    max_tokens=500
)

print(response.choices[0].message.content)
```

### JavaScript/TypeScript

```typescript
const response = await fetch("http://127.0.0.1:1337/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "llama-3.2-3b-instruct-4bit",
    messages: [{ role: "user", content: "Explain quantum computing" }],
    max_tokens: 500,
  }),
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

### Streaming with JavaScript

```javascript
const response = await fetch("http://127.0.0.1:1337/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "llama-3.2-3b-instruct-4bit",
    messages: [{ role: "user", content: "Tell me a story" }],
    stream: true,
  }),
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split("\n");

  for (const line of lines) {
    if (line.startsWith("data: ")) {
      const data = line.slice(6);
      if (data === "[DONE]") break;

      const json = JSON.parse(data);
      const content = json.choices[0].delta.content;
      if (content) process.stdout.write(content);
    }
  }
}
```

## Best Practices

1. **Model Selection** — Use lowercase model names with hyphens
2. **Streaming** — Enable for better perceived performance
3. **Error Handling** — Always check for error responses
4. **Context Management** — Monitor token usage to avoid limits
5. **Connection Pooling** — Reuse HTTP connections when possible

---

<p align="center">
  For more examples, see the <a href="/integrations">Integration Guide</a> or visit our <a href="https://github.com/dinoki-ai/osaurus/tree/main/examples">GitHub examples</a>.
</p>
