---
title: API Reference
sidebar_label: API
description: Complete API documentation for Osaurus endpoints
sidebar_position: 5
---

# API Reference

Osaurus provides OpenAI-compatible, Ollama-compatible, and MCP APIs for seamless integration with existing tools and AI agents.

## Base URL

```
http://127.0.0.1:1337
```

Override the port with the `OSU_PORT` environment variable.

All endpoints support common API prefixes for compatibility:

- `/v1/endpoint` — OpenAI style
- `/api/endpoint` — Generic style
- `/v1/api/endpoint` — Combined style

## Endpoints Overview

### Core API

| Endpoint | Method | Description |
| -------- | ------ | ----------- |
| `/` | GET | Server status (plain text) |
| `/health` | GET | Health check (JSON) |
| `/v1/models` | GET | List available models (OpenAI) |
| `/api/tags` | GET | List available models (Ollama) |
| `/v1/chat/completions` | POST | Chat completion (OpenAI) |
| `/api/chat` | POST | Chat completion (Ollama) |

### MCP Endpoints

| Endpoint | Method | Description |
| -------- | ------ | ----------- |
| `/mcp/health` | GET | MCP server health |
| `/mcp/tools` | GET | List available tools |
| `/mcp/call` | POST | Execute a tool |

## Core Endpoints

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

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `model` | string | Yes | Model ID to use |
| `messages` | array | Yes | Array of message objects |
| `max_tokens` | integer | No | Maximum tokens to generate (default: 2048) |
| `temperature` | float | No | Sampling temperature 0-2 (default: 0.7) |
| `top_p` | float | No | Nucleus sampling threshold (default: 0.9) |
| `stream` | boolean | No | Enable SSE streaming (default: false) |
| `tools` | array | No | Function/tool definitions |
| `tool_choice` | string/object | No | Tool selection strategy |

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
data: {"id":"chatcmpl-123","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"role":"assistant"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"I'm"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":" doing"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}

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

**Response:**

```json
{
  "model": "llama-3.2-3b-instruct-4bit",
  "created_at": "2024-03-15T10:30:45Z",
  "message": {
    "role": "assistant",
    "content": "The sky appears blue due to Rayleigh scattering..."
  },
  "done": true,
  "total_duration": 1234567890,
  "eval_count": 85
}
```

## MCP Endpoints

### GET /mcp/health

Check MCP server availability.

**Response:**

```json
{
  "status": "ok",
  "tools_available": 12
}
```

### GET /mcp/tools

List all available MCP tools from installed plugins.

**Response:**

```json
{
  "tools": [
    {
      "name": "read_file",
      "description": "Read contents of a file",
      "inputSchema": {
        "type": "object",
        "properties": {
          "path": {
            "type": "string",
            "description": "Path to the file"
          }
        },
        "required": ["path"]
      }
    },
    {
      "name": "browser_navigate",
      "description": "Navigate to a URL in the browser",
      "inputSchema": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "description": "URL to navigate to"
          }
        },
        "required": ["url"]
      }
    }
  ]
}
```

### POST /mcp/call

Execute an MCP tool.

**Request Body:**

```json
{
  "name": "read_file",
  "arguments": {
    "path": "/etc/hosts"
  }
}
```

**Response:**

```json
{
  "content": [
    {
      "type": "text",
      "text": "# Host Database\n127.0.0.1 localhost\n..."
    }
  ]
}
```

**Error Response:**

```json
{
  "error": {
    "code": "tool_not_found",
    "message": "Tool 'unknown_tool' not found"
  }
}
```

## Function Calling

Osaurus supports OpenAI-style function calling for structured interactions.

### Defining Tools

```json
{
  "model": "llama-3.2-3b-instruct-4bit",
  "messages": [
    {"role": "user", "content": "What's the weather in San Francisco?"}
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

Osaurus does not require authentication by default. When using SDK clients, pass any value for the API key:

```python
client = OpenAI(
    base_url="http://127.0.0.1:1337/v1",
    api_key="osaurus"  # Any value works
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

| Code | Description |
| ---- | ----------- |
| `model_not_found` | Requested model doesn't exist |
| `invalid_request` | Malformed request body |
| `context_length_exceeded` | Input exceeds model's context window |
| `tool_not_found` | MCP tool not installed |
| `internal_server_error` | Server-side error |

## CORS Support

Built-in CORS support for browser-based applications:

- **Allowed Origins:** `*` (all origins)
- **Allowed Methods:** `GET, POST, OPTIONS`
- **Allowed Headers:** `Content-Type, Authorization`

## Quick Examples

### Python (OpenAI SDK)

```python
from openai import OpenAI

client = OpenAI(base_url="http://127.0.0.1:1337/v1", api_key="osaurus")

response = client.chat.completions.create(
    model="llama-3.2-3b-instruct-4bit",
    messages=[{"role": "user", "content": "Hello!"}]
)
print(response.choices[0].message.content)
```

### cURL

```bash
curl http://127.0.0.1:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.2-3b-instruct-4bit",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

### MCP Tool Call

```bash
curl -X POST http://127.0.0.1:1337/mcp/call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "current_time",
    "arguments": {}
  }'
```

---

<p align="center">
  For more examples, see the <a href="/sdk-examples">SDK Examples</a> or <a href="/integrations">Integration Guide</a>.
</p>
