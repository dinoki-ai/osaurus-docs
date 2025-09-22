---
title: Overview
sidebar_label: Overview
description: Native Apple Silicon local LLM server with OpenAI- and Ollama-compatible APIs.
sidebar_position: 2
---

Osaurus is a native, Apple Silicon–only local LLM server. It’s built on Apple’s MLX for high performance on M-series Macs, and ships as a SwiftUI app with an embedded SwiftNIO HTTP server exposing OpenAI-compatible and Ollama-compatible endpoints.

Created by Dinoki Labs (dinoki.ai), makers of a fully native desktop AI assistant and companion.

## Highlights

- Native MLX runtime optimized for Apple Silicon (MLX/MLXLLM)
- OpenAI-compatible endpoints: `/v1/models` and `/v1/chat/completions` (stream and non-stream)
- Ollama-compatible endpoint: `/chat` with NDJSON streaming (works with OllamaKit and other Ollama clients)
- Function/Tool calling (OpenAI style), including streaming tool call deltas
- Fast token streaming via Server-Sent Events
- Model manager UI to browse, download, and manage MLX models (mlx-community)
- Real-time CPU and RAM usage visualization
- Self-contained SwiftUI app + SwiftNIO server

## Requirements

- macOS 15.5+
- Apple Silicon (M1 or newer)
- Xcode 16.4+ (to build from source)

## Architecture (at a glance)

SwiftUI app + SwiftNIO HTTP server with MLX-backed generation:

```
osaurus/
├── Core/
├── Controllers/            # Server lifecycle, model discovery/downloads
├── Models/                 # DTOs, response writers, config, health
├── Networking/             # Router and request handlers
├── Services/               # MLX service, search, system monitor
├── Views/                  # SwiftUI UI including model manager
└── Assets.xcassets/
```

For full source and details, see the repository:
https://github.com/dinoki-ai/osaurus
