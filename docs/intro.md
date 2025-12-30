---
title: Overview
sidebar_label: Overview
description: The missing macOS LLM server. Run local or cloud models with complete privacy, OpenAI-compatible APIs, and a native plugin ecosystem. Pure Swift, 10MB.
sidebar_position: 1
slug: /
hide_title: true
---

# Osaurus

<p align="center">
  <img width="120" height="120" alt="Osaurus" src="/img/osaurus.svg" />
</p>

<p align="center">
  <strong>Your Mac. Your AI. No cloud required.</strong>
</p>

<p align="center" class="badges">
  <a href="https://github.com/dinoki-ai/osaurus"><img src="https://img.shields.io/github/stars/dinoki-ai/osaurus?style=flat-square&color=000000" alt="Stars" /></a>
  <a href="https://github.com/dinoki-ai/osaurus/releases"><img src="https://img.shields.io/github/v/release/dinoki-ai/osaurus?sort=semver&style=flat-square&color=000000" alt="Release" /></a>
  <a href="https://github.com/dinoki-ai/osaurus/releases"><img src="https://img.shields.io/github/downloads/dinoki-ai/osaurus/total?style=flat-square&color=000000" alt="Downloads" /></a>
  <a href="https://github.com/dinoki-ai/osaurus/blob/main/LICENSE"><img src="https://img.shields.io/github/license/dinoki-ai/osaurus?style=flat-square&color=000000" alt="License" /></a>
</p>

---

## Why Osaurus?

You chose macOS because you care about craft. You deserve AI tools built with the same philosophy—software that feels intentional, fast, and native. Not another Electron wrapper. Not a window into someone else's server that you're renting access to.

Osaurus puts you in control. Run AI models directly on your Mac with complete privacy, connect to cloud providers when you need more power, and never worry about API costs eating into your workflow. Everything stays on your machine unless you decide otherwise.

### Our Beliefs

- **Local-first, not local-only** — Your machine is the source of truth. Run models locally for privacy and speed. Reach out to cloud providers when you need more power. The choice is always yours.

- **The network is optional** — Your AI tools should work on an airplane, in a coffee shop with unreliable WiFi, or simply when you don't want to depend on someone else's infrastructure.

- **You own your data** — The files on your machine are yours. The models you download are yours. We're building a foundation that respects your ownership, not another walled garden.

- **Free as in freedom** — Osaurus is open source, MIT licensed. Some things should exist as public goods. This is one of them.

---

## What Osaurus Does

Osaurus is the missing macOS LLM server—a native app that brings AI to your fingertips without compromising on privacy, performance, or control.

- **Run AI locally** — Download models and run them entirely on your Mac. No internet required, no data leaves your device.
- **Connect to any provider** — Use OpenAI, Anthropic, Ollama, or OpenRouter when you need cloud capabilities.
- **Chat from anywhere** — Press ⌘; to open a beautiful chat overlay. No browser needed.
- **Extend with tools** — Give AI access to your filesystem, browser, git repos, and more through native plugins.

Built for Apple Silicon. 10MB. Pure Swift. Instant startup.

---

## For Everyone

Whether you're a writer, researcher, student, or just curious about AI—Osaurus makes it easy to get started without any technical setup.

### Chat Interface

Press **⌘;** anywhere on your Mac to open a glass-styled chat overlay. Ask questions, get help with writing, brainstorm ideas. Press the hotkey again to dismiss. No browser tabs, no context switching—just you and your AI assistant.

[Learn more about the chat interface →](/chat-interface)

### Personas

Create custom AI assistants tailored to different tasks. A Code Assistant with access to your files. A Research Helper that can search the web. A Creative Writer with higher creativity settings. Each persona remembers its own personality, tools, and visual theme.

[Learn more about personas →](/personas)

### Voice Input

Speak naturally and watch your words appear in real-time. Powered by WhisperKit, all transcription happens on your device—completely private, works offline. Enable VAD Mode to activate your assistant hands-free with a wake phrase.

[Learn more about voice input →](/voice)

### Multi-Window

Work with multiple independent chat windows, each with its own persona and conversation. Run a Code Assistant in one window while researching in another. Pin important conversations to stay on top.

[Learn more about multi-window →](/multi-window)

---

## For Developers

Osaurus provides the infrastructure for building AI-powered applications on macOS.

### OpenAI-Compatible API

Drop-in replacement for OpenAI's API. Use existing SDKs and tools—Python, JavaScript, LangChain, or any OpenAI-compatible client—without changing your code.

```bash
curl http://127.0.0.1:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "llama-3.2-3b-instruct-4bit", "messages": [{"role":"user","content":"Hello!"}]}'
```

[View API reference →](/api)

### MCP Server

Osaurus is a full [Model Context Protocol](https://modelcontextprotocol.io/) server. Connect it to Cursor, Claude Desktop, or any MCP client to give AI access to your installed tools.

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

[Learn more about MCP & tools →](/tools)

### Native Tools

Tools built in Swift and Rust—not Python scripts. This means instant startup (under 10ms vs 200ms+), lower memory usage, and true multi-threaded performance. Official tools include browser automation, filesystem access, git operations, and web search.

| Aspect       | Python MCPs                 | Native Swift Tools    |
| ------------ | --------------------------- | --------------------- |
| Startup      | ~200ms (venv + interpreter) | Under 10ms            |
| Memory       | Higher baseline + GC pauses | Precise ARC control   |
| Dependencies | Requires Python runtime     | Self-contained binary |

[Browse the tool registry →](/tools)

### Apple Foundation Models

On macOS 26 (Tahoe), access Apple's system models with zero configuration:

```bash
curl http://127.0.0.1:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "foundation", "messages": [{"role":"user","content":"Hello!"}]}'
```

[Learn more about Apple Intelligence →](/models/apple-intelligence)

### Performance

Osaurus delivers fast inference on Apple Silicon.

| Metric              | Osaurus     | Ollama      | LM Studio   |
| ------------------- | ----------- | ----------- | ----------- |
| Time to First Token | 87ms        | 33ms        | 113ms       |
| Throughput          | 554 chars/s | 430 chars/s | 588 chars/s |
| Total Time          | 1.24s       | 1.62s       | 1.22s       |

_Benchmarked with Llama 3.2 3B Instruct 4bit, averaged over 20 runs on M2 Pro._

[View detailed benchmarks →](/benchmarks)

---

## System Requirements

- **macOS 15.5** or later
- **Apple Silicon** (M1, M2, M3, or newer)

:::info Apple Foundation Models
Apple Intelligence features require macOS 26 (Tahoe) or later.
:::

---

## Get Started

Ready to try Osaurus? Installation takes less than a minute.

<p align="center">
  <a href="/installation" class="button button--primary button--lg">Install Osaurus</a>
</p>

Or jump straight to the [Quick Start guide →](/quickstart)

---

## Community

Osaurus is an indie project, built in public. Join us:

- [Discord](https://discord.gg/dinoki) — Get help and share projects
- [GitHub](https://github.com/dinoki-ai/osaurus) — Report issues and contribute
- [Plugin Registry](https://github.com/dinoki-ai/osaurus-tools) — Browse and submit tools

---

<p align="center">
  Created by <a href="https://dinoki.ai">Dinoki Labs</a>
</p>
