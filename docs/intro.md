---
title: Overview
sidebar_label: Overview
description: Native Apple Silicon local LLM server with OpenAI- and Ollama-compatible APIs.
sidebar_position: 1
slug: /
hide_title: true
---

# Osaurus

<p align="center">
  <img width="120" height="120" alt="Osaurus" src="/img/osaurus.svg" />
</p>

<p align="center">
  <strong>Native local LLM server for Apple Silicon</strong><br/>
  Built on MLX for exceptional performance on M-series chips
</p>

<p align="center" class="badges">
  <a href="https://github.com/dinoki-ai/osaurus/releases"><img src="https://img.shields.io/github/v/release/dinoki-ai/osaurus?sort=semver&style=flat-square&color=000000" alt="Release" /></a>
  <a href="https://github.com/dinoki-ai/osaurus/releases"><img src="https://img.shields.io/github/downloads/dinoki-ai/osaurus/total?style=flat-square&color=000000" alt="Downloads" /></a>
  <a href="https://github.com/dinoki-ai/osaurus/blob/main/LICENSE"><img src="https://img.shields.io/github/license/dinoki-ai/osaurus?style=flat-square&color=000000" alt="License" /></a>
</p>

## Introduction

Osaurus is a native local LLM server designed exclusively for Apple Silicon. It provides OpenAI-compatible and Ollama-compatible APIs, integrates seamlessly with Apple Foundation Models, and includes a refined SwiftUI application with an embedded SwiftNIO server.

## Key Features

### Performance

**Native MLX Runtime**  
Optimized for Apple Silicon using MLX and MLXLLM frameworks for maximum efficiency.

**Apple Foundation Models**  
Access system models with `model: "foundation"` on supported macOS versions.

**Exceptional Speed**  
Purpose-built for M-series processors, delivering industry-leading inference performance.

### Compatibility

**OpenAI & Ollama APIs**  
Drop-in replacement for existing tools and workflows.

**Function Calling**  
Full support for OpenAI-style function and tool calling with streaming.

**Server-Sent Events**  
Low-latency token streaming for responsive applications.

### User Experience

**Integrated Chat Interface**  
Beautiful glass-styled overlay accessible via global hotkey (⌘;).

**Model Management**  
Browse, download, and manage MLX models through an intuitive interface.

**System Monitoring**  
Real-time CPU and memory usage visualization.

### Developer Experience

**CORS Support**  
Built-in cross-origin resource sharing for browser-based clients.

**Command Line Interface**  
Complete server management through terminal commands.

**Path Normalization**  
Automatic handling of `/v1`, `/api`, and `/v1/api` prefixes.

**SDK Compatibility**  
Works seamlessly with OpenAI Python and JavaScript SDKs.

## System Requirements

- **macOS 15.5** or later
- **Apple Silicon** (M1, M2, M3, or newer)
- **Xcode 16.4** or later (only for building from source)

> Apple Intelligence features require macOS 26 Tahoe or later.

## Performance Benchmarks

Osaurus delivers exceptional performance on Apple Silicon hardware.

| Metric              | Osaurus     | Ollama      | LM Studio   |
| ------------------- | ----------- | ----------- | ----------- |
| Time to First Token | 87ms        | 33ms        | 113ms       |
| Throughput          | 554 chars/s | 430 chars/s | 588 chars/s |
| Total Time          | 1.24s       | 1.62s       | 1.22s       |

_Benchmarked with Llama 3.2 3B Instruct 4bit, averaged over 20 runs._

[View detailed benchmarks →](/benchmarks)

## Why Osaurus

### The Challenge

Cloud-based AI services present significant limitations:

- **Cost** — Per-token pricing accumulates rapidly
- **Privacy** — Data leaves your device
- **Latency** — Network round-trips impact responsiveness
- **Restrictions** — Rate limits and content filtering

### The Solution

Osaurus addresses these challenges:

- **Free** — No API costs, only electricity
- **Private** — All processing remains on your Mac
- **Instant** — Zero network latency
- **Unrestricted** — Run any model without limitations

## Use Cases

- **Development** — Test AI features without API costs
- **Creative Writing** — Private brainstorming and editing
- **Code Generation** — Offline programming assistance
- **Research** — Analyze documents with complete privacy
- **Education** — Learn and experiment with LLMs
- **Enterprise** — Keep sensitive data on-premise

## Documentation

- [Installation Guide](/installation) — Detailed setup instructions
- [Quickstart Tutorial](/quickstart) — Get running in minutes
- [API Reference](/api) — Complete endpoint documentation
- [Model Management](/models) — Download and configure models
- [CLI Documentation](/cli) — Command-line usage
- [Integration Examples](/integrations) — Connect with your applications

## Community

[Discord](https://discord.gg/dinoki) — Get help and share projects  
[GitHub](https://github.com/dinoki-ai/osaurus) — Report issues and contribute  
[X/Twitter](https://x.com/dinokilabs) — Follow for updates  
[Contributing](https://github.com/dinoki-ai/osaurus/blob/main/CONTRIBUTING.md) — Help improve Osaurus

## Created by Dinoki Labs

Osaurus is developed by [Dinoki Labs](https://dinoki.ai), creators of a fully native desktop AI assistant for macOS.

---

<p align="center">
  <a href="/installation" class="button button--primary button--lg">Get Started</a>
</p>
