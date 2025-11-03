---
title: Quickstart
sidebar_label: Quickstart
description: Get up and running with Osaurus in minutes
sidebar_position: 3
---

# Quickstart

Get your first local LLM running in minutes. This guide walks through installation, setup, and your first API call.

## Setup

### Install Osaurus

Install using Homebrew:

```bash
brew install --cask osaurus
```

Alternatively, [download directly](https://github.com/dinoki-ai/osaurus/releases/latest) from GitHub releases.

### Launch the Application

1. Open Osaurus from Spotlight (⌘ Space) or Applications
2. Look for the Osaurus icon in your menu bar
3. Click the icon to access the control panel

### Start the Server

1. Click **Start Server** in the menu
2. Wait for the status to show **Running on port 1337**
3. Your local LLM server is now active

### Download a Model

1. Select **Model Manager** from the menu bar
2. Browse available models or use search
3. For first-time users, we recommend **Llama 3.2 3B Instruct 4bit**
   - Balanced performance and quality
   - 2GB download size
   - Runs efficiently on 8GB+ Macs
4. Click **Download** and wait for completion

### Test the API

Verify your installation with a simple request:

```bash
curl -s http://127.0.0.1:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.2-3b-instruct-4bit",
    "messages": [{"role":"user","content":"Hello! Tell me a fun fact about dinosaurs."}],
    "max_tokens": 100
  }' | jq
```

## Using the Chat Interface

Osaurus includes an integrated chat interface for direct model interaction.

### Accessing Chat

Press **⌘;** (Command + Semicolon) to open the chat overlay. Type your message and press Enter to send. Press **⌘;** again to close.

### Chat Features

- **Markdown Rendering** — Formatted responses with syntax highlighting
- **Copy Messages** — Click the copy icon on any message
- **Stop Generation** — Interrupt streaming responses
- **Model Selection** — Switch models using the dropdown
- **System Prompts** — Configure in Settings → Chat

## Example Requests

### Creative Writing

```bash
curl -s http://127.0.0.1:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.2-3b-instruct-4bit",
    "messages": [{"role":"user","content":"Write a haiku about coding late at night"}]
  }' | jq -r '.choices[0].message.content'
```

### Code Generation

```bash
curl -s http://127.0.0.1:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.2-3b-instruct-4bit",
    "messages": [{"role":"user","content":"Write a Python function to reverse a string without using built-in functions"}]
  }' | jq -r '.choices[0].message.content'
```

### Streaming Responses

```bash
curl -N http://127.0.0.1:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.2-3b-instruct-4bit",
    "messages": [{"role":"user","content":"Explain quantum computing in simple terms"}],
    "stream": true
  }'
```

## Apple Foundation Models

On macOS 26 Tahoe or later, access Apple's system models:

```bash
# Check availability
curl -s http://127.0.0.1:1337/v1/models | jq '.data[] | select(.id=="foundation")'

# Use foundation model
curl -s http://127.0.0.1:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "foundation",
    "messages": [{"role":"user","content":"What makes Apple Silicon special?"}]
  }' | jq
```

## Command Line Interface

Control Osaurus from Terminal:

```bash
# Start server
osaurus serve --port 1337

# Enable LAN access
osaurus serve --port 1337 --expose

# Check status
osaurus status

# Stop server
osaurus stop

# Open UI
osaurus ui
```

## Python Integration

Use the OpenAI SDK with Osaurus:

```python
from openai import OpenAI

# Configure for local server
client = OpenAI(
    base_url="http://127.0.0.1:1337/v1",
    api_key="not-needed"
)

# Make a request
response = client.chat.completions.create(
    model="llama-3.2-3b-instruct-4bit",
    messages=[
        {"role": "user", "content": "Write a joke about programming"}
    ]
)

print(response.choices[0].message.content)
```

## JavaScript Integration

Access Osaurus from Node.js or browser environments:

```javascript
const response = await fetch("http://127.0.0.1:1337/v1/chat/completions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "llama-3.2-3b-instruct-4bit",
    messages: [{ role: "user", content: "What's the weather like on Mars?" }],
  }),
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

## Model Recommendations

### Fast Response Models (4-bit)

- **Llama 3.2 3B Instruct** — Excellent general-purpose model
- **Qwen 2.5 3B Instruct** — Strong reasoning capabilities
- **Gemma 2 2B Instruct** — Optimized for speed

### Quality-Focused Models

- **Llama 3.2 8B Instruct** — Superior quality with reasonable speed
- **Mistral 7B Instruct** — Well-rounded performance
- **DeepSeek Coder 7B** — Specialized for programming tasks

### High-Memory Systems (32GB+)

Consider 8-bit variants for enhanced quality or larger 13B-30B models for advanced use cases.

## Performance Optimization

1. **Model Selection** — Start with 4-bit models for optimal speed
2. **Resource Management** — Close unnecessary applications
3. **Context Length** — Shorter prompts yield faster responses
4. **Response Streaming** — Improves perceived performance
5. **System Monitoring** — Use Osaurus's built-in monitor

## Troubleshooting

### Model Not Found

- Verify download completion in Model Manager
- Check exact model name: `curl http://127.0.0.1:1337/v1/models`
- Ensure lowercase naming with hyphens

### Slow Performance

- Try smaller models (3B vs 7B)
- Reduce `max_tokens` parameter
- Free up system memory
- Check Activity Monitor for resource usage

### Connection Issues

- Verify server status: `osaurus status`
- Check port configuration (default: 1337)
- Ensure firewall allows localhost connections

## Next Steps

Explore these resources to expand your usage:

1. [API Reference](/api) — Complete endpoint documentation
2. [Model Guide](/models) — Detailed model information
3. [Configuration](/configuration) — Customize Osaurus settings
4. [Integrations](/integrations) — Build with Osaurus
5. [Community](https://discord.gg/dinoki) — Connect with other users

---

<p align="center">
  <strong>You're now running AI locally on your Mac.</strong><br/>
  No cloud dependencies. No usage limits. Complete privacy.
</p>
