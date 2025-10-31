---
title: Integrations
sidebar_label: Integrations
description: Connect Osaurus with your favorite tools and frameworks
sidebar_position: 11
---

# Integration Guide

Osaurus provides OpenAI-compatible and Ollama-compatible APIs, making it easy to integrate with existing tools, libraries, and applications. This guide covers popular integrations and best practices.

## 🔌 Quick Integration Overview

| Integration Type   | Compatibility | Setup Difficulty |
| ------------------ | ------------- | ---------------- |
| OpenAI SDKs        | ✅ Full       | Easy             |
| Langchain          | ✅ Full       | Easy             |
| LlamaIndex         | ✅ Full       | Easy             |
| Continue.dev       | ✅ Full       | Easy             |
| Cursor             | ✅ Full       | Easy             |
| OllamaKit          | ✅ Full       | Easy             |
| Web Apps           | ✅ With CORS  | Easy             |
| Native Apps        | ✅ Full       | Moderate         |
| VS Code Extensions | ✅ Full       | Easy             |

## 🐍 Python Integrations

### OpenAI SDK

The official OpenAI Python SDK works perfectly with Osaurus:

```python
from openai import OpenAI

# Configure client for Osaurus
client = OpenAI(
    base_url="http://127.0.0.1:1337/v1",
    api_key="not-needed"  # Osaurus doesn't require API keys
)

# Standard chat completion
response = client.chat.completions.create(
    model="llama-3.2-3b-instruct-4bit",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing briefly."}
    ],
    temperature=0.7,
    max_tokens=200
)

print(response.choices[0].message.content)
```

### Streaming Responses

```python
# Streaming example
stream = client.chat.completions.create(
    model="llama-3.2-3b-instruct-4bit",
    messages=[{"role": "user", "content": "Write a poem about coding"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

### Function Calling

```python
# Define tools
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get weather for a location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {"type": "string"},
                "unit": {"type": "string", "enum": ["C", "F"]}
            },
            "required": ["location"]
        }
    }
}]

# Make request with tools
response = client.chat.completions.create(
    model="llama-3.2-3b-instruct-4bit",
    messages=[{"role": "user", "content": "What's the weather in Paris?"}],
    tools=tools,
    tool_choice="auto"
)

# Handle tool calls
if response.choices[0].message.tool_calls:
    for tool_call in response.choices[0].message.tool_calls:
        print(f"Tool: {tool_call.function.name}")
        print(f"Args: {tool_call.function.arguments}")
```

## 🦜 Langchain Integration

Osaurus works seamlessly with Langchain:

```python
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

# Configure Langchain for Osaurus
llm = ChatOpenAI(
    base_url="http://127.0.0.1:1337/v1",
    api_key="not-needed",
    model="llama-3.2-3b-instruct-4bit",
    temperature=0.7
)

# Simple completion
messages = [
    SystemMessage(content="You are a helpful coding assistant."),
    HumanMessage(content="Write a Python function to reverse a string.")
]

response = llm.invoke(messages)
print(response.content)
```

### Langchain Streaming

```python
# Streaming with callbacks
for chunk in llm.stream(messages):
    print(chunk.content, end="", flush=True)
```

### Langchain Chains

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Create a chain
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant that translates {input_language} to {output_language}."),
    ("human", "{text}")
])

chain = prompt | llm | StrOutputParser()

# Use the chain
result = chain.invoke({
    "input_language": "English",
    "output_language": "French",
    "text": "Hello, how are you?"
})

print(result)
```

## 📇 LlamaIndex Integration

```python
from llama_index.llms.openai import OpenAI
from llama_index.core import Settings

# Configure LlamaIndex for Osaurus
Settings.llm = OpenAI(
    api_base="http://127.0.0.1:1337/v1",
    api_key="not-needed",
    model="llama-3.2-3b-instruct-4bit"
)

# Use with documents
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex

documents = SimpleDirectoryReader("docs").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

response = query_engine.query("What is Osaurus?")
print(response)
```

## 🌐 JavaScript/TypeScript Integrations

### Node.js with OpenAI SDK

```javascript
import OpenAI from "openai";

// Configure for Osaurus
const openai = new OpenAI({
  baseURL: "http://127.0.0.1:1337/v1",
  apiKey: "not-needed",
});

// Chat completion
const response = await openai.chat.completions.create({
  model: "llama-3.2-3b-instruct-4bit",
  messages: [{ role: "user", content: "Hello!" }],
});

console.log(response.choices[0].message.content);
```

### Browser Integration

Enable CORS in Osaurus settings, then:

```javascript
// Direct fetch API
const response = await fetch("http://127.0.0.1:1337/v1/chat/completions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "llama-3.2-3b-instruct-4bit",
    messages: [{ role: "user", content: "Hello from the browser!" }],
  }),
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

### React Integration

```jsx
import { useState } from "react";

function ChatComponent() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:1337/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.2-3b-instruct-4bit",
          messages: [{ role: "user", content: message }],
          stream: false,
        }),
      });

      const data = await res.json();
      setResponse(data.choices[0].message.content);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
      {response && <div>{response}</div>}
    </div>
  );
}
```

### Streaming in React

```jsx
const streamMessage = async () => {
  const res = await fetch("http://127.0.0.1:1337/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama-3.2-3b-instruct-4bit",
      messages: [{ role: "user", content: message }],
      stream: true,
    }),
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n");

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") break;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices[0].delta.content;
          if (content) {
            result += content;
            setResponse(result);
          }
        } catch (e) {
          // Skip invalid JSON
        }
      }
    }
  }
};
```

## 💻 IDE Integrations

### Continue.dev (VS Code/JetBrains)

Add to your `~/.continue/config.json`:

```json
{
  "models": [
    {
      "title": "Osaurus Llama 3.2",
      "provider": "openai",
      "model": "llama-3.2-3b-instruct-4bit",
      "apiBase": "http://127.0.0.1:1337/v1",
      "apiKey": "not-needed"
    }
  ]
}
```

### Cursor

In Cursor settings, add a custom model:

1. Open Settings → Models
2. Add OpenAI-compatible endpoint
3. Set base URL: `http://127.0.0.1:1337/v1`
4. Set model: `llama-3.2-3b-instruct-4bit`
5. API key: `not-needed`

### Copilot Alternative

Use with `copilot.vim` or similar:

```vim
" In your vim config
let g:copilot_proxy = 'http://127.0.0.1:1337'
let g:copilot_model = 'llama-3.2-3b-instruct-4bit'
```

## 📱 Native App Integration

### Swift/macOS

For macOS apps, use the shared configuration discovery:

```swift
import Foundation

// Discover Osaurus instance
let instance = try OsaurusDiscoveryService.discoverLatestRunningInstance()

// Make API request
let url = instance.url.appendingPathComponent("v1/chat/completions")
var request = URLRequest(url: url)
request.httpMethod = "POST"
request.setValue("application/json", forHTTPHeaderField: "Content-Type")

let body = [
    "model": "llama-3.2-3b-instruct-4bit",
    "messages": [["role": "user", "content": "Hello!"]]
]
request.httpBody = try JSONEncoder().encode(body)

let (data, _) = try await URLSession.shared.data(for: request)
let response = try JSONDecoder().decode(ChatCompletion.self, from: data)
```

[Full native integration guide →](/shared-configuration)

### Electron

```javascript
// Main process
const { discoverLatestRunningInstance } = require("./osaurus-discovery");

ipcMain.handle("osaurus:chat", async (event, message) => {
  const instance = await discoverLatestRunningInstance();

  const response = await fetch(`${instance.url}/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama-3.2-3b-instruct-4bit",
      messages: [{ role: "user", content: message }],
    }),
  });

  return response.json();
});
```

## 🦙 Ollama-Compatible Clients

### OllamaKit (Swift)

```swift
import OllamaKit

let osaurus = OllamaKit(baseURL: URL(string: "http://127.0.0.1:1337")!)

// List models
let models = try await osaurus.models()

// Chat
let response = try await osaurus.chat(
    model: "llama-3.2-3b-instruct-4bit",
    messages: [.user("Hello!")]
)
```

### Ollama Python

```python
import requests

# Ollama-style chat
response = requests.post(
    "http://127.0.0.1:1337/api/chat",
    json={
        "model": "llama-3.2-3b-instruct-4bit",
        "messages": [{"role": "user", "content": "Hello!"}],
        "stream": False
    }
)

print(response.json()["message"]["content"])
```

## 🔧 Tool Integration Examples

### Make (Integromat)

1. Add HTTP module
2. Set URL: `http://127.0.0.1:1337/v1/chat/completions`
3. Method: POST
4. Headers: `Content-Type: application/json`
5. Body: JSON with model and messages

### Zapier

Create a custom webhook action:

1. Webhook URL: `http://127.0.0.1:1337/v1/chat/completions`
2. Method: POST
3. Data: JSON format
4. Parse response for `choices[0].message.content`

### n8n

Use the HTTP Request node:

```json
{
  "method": "POST",
  "url": "http://127.0.0.1:1337/v1/chat/completions",
  "options": {
    "bodyContentType": "json"
  },
  "body": {
    "model": "llama-3.2-3b-instruct-4bit",
    "messages": [{ "role": "user", "content": "{{$node.input.data}}" }]
  }
}
```

## 🌍 CORS Configuration

For browser-based integrations, configure CORS in Osaurus:

1. Open Settings → Advanced → CORS
2. Add allowed origins:
   ```
   http://localhost:3000, http://localhost:5173, https://myapp.com
   ```
3. Or use `*` for development (not recommended for production)

## 🔐 Security Best Practices

### Local Development

- Default localhost binding is secure
- No authentication needed for local use

### Team Access

- Use `--expose` flag carefully
- Implement authentication proxy for production
- Use HTTPS with reverse proxy

### API Key Handling

- Osaurus ignores API keys
- Use placeholder values in configs
- Don't expose real OpenAI keys

## 📚 Framework-Specific Guides

### Next.js Integration

```javascript
// app/api/chat/route.js
export async function POST(request) {
  const { message } = await request.json();

  const response = await fetch("http://127.0.0.1:1337/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama-3.2-3b-instruct-4bit",
      messages: [{ role: "user", content: message }],
    }),
  });

  return Response.json(await response.json());
}
```

### Django Integration

```python
# views.py
import requests
from django.http import JsonResponse

def chat_view(request):
    user_message = request.POST.get('message')

    response = requests.post(
        'http://127.0.0.1:1337/v1/chat/completions',
        json={
            'model': 'llama-3.2-3b-instruct-4bit',
            'messages': [{'role': 'user', 'content': user_message}],
        }
    )

    return JsonResponse(response.json())
```

### FastAPI Integration

```python
from fastapi import FastAPI
import httpx

app = FastAPI()

@app.post("/chat")
async def chat(message: str):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://127.0.0.1:1337/v1/chat/completions",
            json={
                "model": "llama-3.2-3b-instruct-4bit",
                "messages": [{"role": "user", "content": message}],
            }
        )
    return response.json()
```

## 🎯 Integration Checklist

- [ ] **Choose integration method** (SDK, API, or Ollama-compatible)
- [ ] **Configure base URL** to point to Osaurus
- [ ] **Set model name** (use lowercase with hyphens)
- [ ] **Handle streaming** if needed
- [ ] **Configure CORS** for browser apps
- [ ] **Test error handling** for robustness
- [ ] **Monitor performance** and adjust settings

## 🆘 Troubleshooting

### Connection Refused

- Verify Osaurus is running: `osaurus status`
- Check port number matches configuration
- Ensure firewall allows connections

### CORS Errors

- Add origin to CORS settings in Osaurus
- Verify exact origin match (including protocol)
- Check browser console for details

### Model Not Found

- List available models: `curl http://127.0.0.1:1337/v1/models`
- Use exact model name from list
- Download model if needed

### Timeout Errors

- Increase client timeout settings
- Use streaming for long responses
- Consider smaller models for speed

---

<p align="center">
  <strong>Need help with integration?</strong><br/>
  Check our <a href="/sdk-examples">SDK Examples</a> or join our <a href="https://discord.gg/dinoki">Discord</a>
</p>
