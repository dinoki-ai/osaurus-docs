---
title: Overview
sidebar_label: Overview
description: The missing macOS LLM server. Run local or cloud models with OpenAI & Anthropic compatible APIs, MCP support, tool calling, and a native plugin ecosystem. Pure Swift, 10MB.
sidebar_position: 1
slug: /
hide_title: true
---

# Osaurus

<p align="center">
  <img width="120" height="120" alt="Osaurus" src="/img/osaurus.svg" />
</p>

<p align="center">
  <strong>The missing macOS LLM server</strong><br/>
  Run local and remote models on Apple Silicon with OpenAI-compatible APIs, tool calling, and a built-in plugin ecosystem. 10MB. Pure Swift.
</p>

<p align="center" class="badges">
  <a href="https://github.com/dinoki-ai/osaurus/releases"><img src="https://img.shields.io/github/v/release/dinoki-ai/osaurus?sort=semver&style=flat-square&color=000000" alt="Release" /></a>
  <a href="https://github.com/dinoki-ai/osaurus/releases"><img src="https://img.shields.io/github/downloads/dinoki-ai/osaurus/total?style=flat-square&color=000000" alt="Downloads" /></a>
  <a href="https://github.com/dinoki-ai/osaurus/blob/main/LICENSE"><img src="https://img.shields.io/github/license/dinoki-ai/osaurus?style=flat-square&color=000000" alt="License" /></a>
</p>

## What is Osaurus?

Osaurus is an all-in-one LLM server for macOS:

- **Local Models** — Run MLX models on Apple Silicon with optimized inference
- **Remote Providers** — Connect to OpenAI, Anthropic, Ollama, OpenRouter, and more
- **OpenAI, Anthropic & Ollama APIs** — Drop-in compatible endpoints
- **MCP Server** — Expose tools to Cursor, Claude Desktop, and other agents
- **Native Plugins** — Swift and Rust tools, significantly faster than Python
- **Apple Foundation Models** — System model on macOS 26+ (Tahoe)

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

### OpenAI, Anthropic & Ollama Compatible

Drop-in replacement for existing tools and workflows:

- OpenAI and Anthropic SDKs (Python & JavaScript)
- LangChain, LlamaIndex, and other frameworks
- Continue.dev, Cursor, and IDE integrations
- Any OpenAI-compatible client

### Apple Foundation Models

Access Apple's system models with zero configuration on macOS 26+:

```bash
curl http://127.0.0.1:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "foundation", "messages": [{"role": "user", "content": "Hello!"}]}'
```

### Menu Bar Chat UI

Beautiful glass-styled chat overlay accessible via global hotkey (⌘;). No browser needed—just press and chat.

### Developer Tools

Built-in debugging via the Management window (⌘⇧M):

- **Insights** — Real-time API monitoring, performance stats, inference metrics
- **Server Explorer** — Interactive endpoint browsing and testing

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

People chose macOS because they care about craft. They deserve AI tools built with the same philosophy—software that feels intentional, fast, and native. Osaurus is the infrastructure that gets out of the way and lets a thousand lovable products bloom.

### Our Philosophy

We believe AI shouldn't repeat the mistakes of the cloud era. Here's what guides us:

- **Local-first, not local-only** — Your machine is the source of truth. Run models locally when you want privacy and speed. Reach out to cloud providers when you need more power. The choice is yours.

- **The network is optional** — Local-first software works offline, by design. Your AI tools should function on an airplane, in a coffee shop with unreliable WiFi, or simply when you don't want to depend on a server.

- **You retain ownership and control** — The files on your machine are yours. The models you download are yours. We're not building another walled garden—we're building a foundation that respects your ownership.

- **Decentralized by design** — AI shouldn't be locked behind platform gatekeepers. We're building infrastructure that gives people choices, not dependencies.

- **Free as in freedom** — Osaurus is open source, MIT licensed. Some things should exist as public goods. This is one of them.

### The Practical Benefits

- **No API costs** — Run inference locally, pay only for electricity
- **Complete privacy** — All processing stays on your Mac
- **Native performance** — 10MB Pure Swift, instant startup, no Electron
- **Zero dependencies** — Single app, no Python environments to manage
- **Unified interface** — One server for local models, cloud providers, and tools

## Use Cases

- **AI Agents** — Connect MCP clients to local tools for autonomous workflows
- **Development** — Test AI features without API costs
- **Code Generation** — Offline programming assistance with tool access
- **Research** — Analyze documents with complete privacy
- **Automation** — Browser control, file operations, and more via plugins

## Quick Links

- [Installation](/installation) — Get running in minutes
- [Quickstart](/quickstart) — First API call and chat
- [Remote Providers](/integrations#remote-providers) — Connect to cloud APIs
- [Tools & Plugins](/tools) — Native MCP tools
- [API Reference](/api) — Endpoint documentation
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
