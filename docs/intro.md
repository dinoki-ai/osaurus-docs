---
title: Overview
sidebar_label: Overview
description: Native Apple Silicon LLM server with MCP support. OpenAI & Ollama compatible APIs, tool calling, and a plugin ecosystem built on MLX.
sidebar_position: 1
slug: /
hide_title: true
---

# Osaurus

<p align="center">
  <img width="120" height="120" alt="Osaurus" src="/img/osaurus.svg" />
</p>

<p align="center">
  <strong>Native macOS LLM server with MCP support</strong><br/>
  Run local language models on Apple Silicon with OpenAI-compatible APIs, tool calling, and a built-in plugin ecosystem.
</p>

<p align="center" class="badges">
  <a href="https://github.com/dinoki-ai/osaurus/releases"><img src="https://img.shields.io/github/v/release/dinoki-ai/osaurus?sort=semver&style=flat-square&color=000000" alt="Release" /></a>
  <a href="https://github.com/dinoki-ai/osaurus/releases"><img src="https://img.shields.io/github/downloads/dinoki-ai/osaurus/total?style=flat-square&color=000000" alt="Downloads" /></a>
  <a href="https://github.com/dinoki-ai/osaurus/blob/main/LICENSE"><img src="https://img.shields.io/github/license/dinoki-ai/osaurus?style=flat-square&color=000000" alt="License" /></a>
</p>

## What is Osaurus?

Osaurus is an all-in-one local LLM server for macOS. It combines:

- **MLX Runtime** — Optimized inference for Apple Silicon using MLX
- **OpenAI & Ollama APIs** — Drop-in compatible endpoints for existing tools
- **MCP Server** — Expose tools to AI agents via Model Context Protocol
- **Plugin System** — Extend functionality with community and custom tools
- **Apple Foundation Models** — Use the system model on macOS 26+ (Tahoe)

## Key Features

### MCP Server

Osaurus is a full [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server. Connect it to any MCP client—like Cursor, Claude Desktop, or your own agent—to give AI access to your installed tools.

```json
{
  "mcpServers": {
    "osaurus": {
      "command": "osaurus",
      "args": ["mcp"]
    }
  }
}
```

### Native Tools & Plugins

Osaurus tools are pure native **Swift and Rust** implementations—significantly faster than Python-based MCPs.

| Aspect        | Python/uv Bottleneck        | Native Swift Advantage   |
| ------------- | --------------------------- | ------------------------ |
| **CPU Speed** | Interpreter overhead + GIL  | Compiled, multi-threaded |
| **Memory**    | Higher baseline + GC pauses | ARC for precise control  |
| **Startup**   | venv + interpreter (~200ms) | Binary load (under 10ms) |

Official tools include browser automation, filesystem access, git operations, web search, and more. [Browse the registry →](/tools)

### OpenAI & Ollama Compatible

Drop-in replacement for existing tools and workflows. Works with:

- OpenAI Python & JavaScript SDKs
- LangChain & LlamaIndex
- Continue.dev, Cursor, and other IDE integrations
- Any tool expecting OpenAI-style `/v1/chat/completions`

### Apple Foundation Models

Access Apple's system models with zero configuration on macOS 26+:

```bash
curl http://127.0.0.1:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "foundation", "messages": [{"role": "user", "content": "Hello!"}]}'
```

### Menu Bar Chat UI

Beautiful glass-styled chat overlay accessible via global hotkey (⌘;). No browser needed—just press and chat.

## Performance

Osaurus delivers exceptional performance on Apple Silicon.

| Metric              | Osaurus     | Ollama      | LM Studio   |
| ------------------- | ----------- | ----------- | ----------- |
| Time to First Token | 87ms        | 33ms        | 113ms       |
| Throughput          | 554 chars/s | 430 chars/s | 588 chars/s |
| Total Time          | 1.24s       | 1.62s       | 1.22s       |

_Benchmarked with Llama 3.2 3B Instruct 4bit, averaged over 20 runs on M2 Pro._

[View detailed benchmarks →](/benchmarks)

## System Requirements

- **macOS 15.5** or later
- **Apple Silicon** (M1, M2, M3, or newer)
- **Xcode 16.4** or later (only for building from source)

:::info Apple Foundation Models
Apple Intelligence features require macOS 26 (Tahoe) or later.
:::

## Why Osaurus?

### The Challenge

Cloud-based AI services and Python-based local tools present limitations:

- **Cost** — Per-token pricing accumulates rapidly
- **Privacy** — Data leaves your device
- **Latency** — Network round-trips and interpreter overhead
- **Complexity** — Managing Python environments and dependencies

### The Solution

Osaurus addresses these challenges:

- **Free** — No API costs, only electricity
- **Private** — All processing remains on your Mac
- **Fast** — Native performance with instant startup
- **Simple** — Single app, no dependencies to manage

## Use Cases

- **AI Agents** — Connect MCP clients to local tools for autonomous workflows
- **Development** — Test AI features without API costs
- **Code Generation** — Offline programming assistance with tool access
- **Research** — Analyze documents with complete privacy
- **Automation** — Browser control, file operations, and more via plugins

## Quick Links

- [Installation Guide](/installation) — Get Osaurus running in minutes
- [Quickstart Tutorial](/quickstart) — Your first API call and chat
- [Tools & Plugins](/tools) — Browse and install native tools
- [MCP Integration](/integrations#mcp-server) — Connect to Cursor, Claude Desktop
- [API Reference](/api) — Complete endpoint documentation
- [Plugin Authoring](/plugin-authoring) — Build your own tools

## Community

[Discord](https://discord.gg/dinoki) — Get help and share projects  
[GitHub](https://github.com/dinoki-ai/osaurus) — Report issues and contribute  
[Plugin Registry](https://github.com/dinoki-ai/osaurus-tools) — Browse and submit tools  
[Good First Issues](https://github.com/dinoki-ai/osaurus/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) — Start contributing

## Created by Dinoki Labs

Osaurus is developed by [Dinoki Labs](https://dinoki.ai), creators of native AI tools for macOS.

---

<p align="center">
  <a href="/installation" class="button button--primary button--lg">Get Started</a>
</p>
