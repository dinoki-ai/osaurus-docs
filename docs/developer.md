---
title: Developer Guide
sidebar_label: Developer Guide
description: Project structure, dependencies, and contribution notes for Osaurus.
sidebar_position: 10
---

## Project structure

```
osaurus/
├── Core/
│   ├── AppDelegate.swift
│   └── osaurusApp.swift
├── Controllers/
│   ├── ServerController.swift      # NIO server lifecycle
│   └── ModelManager.swift          # Model discovery & downloads (Hugging Face)
├── Models/
│   ├── MLXModel.swift
│   ├── OpenAIAPI.swift             # OpenAI‑compatible DTOs
│   ├── ResponseWriters.swift       # SSE and NDJSON response writers
│   ├── ServerConfiguration.swift
│   └── ServerHealth.swift
├── Networking/
│   ├── HTTPHandler.swift           # Request parsing & routing entry
│   ├── Router.swift                # Routes → handlers with path normalization
│   └── AsyncHTTPHandler.swift      # Unified streaming handler
├── Services/
│   ├── MLXService.swift            # MLX loading, session caching, generation
│   ├── SearchService.swift
│   └── SystemMonitorService.swift  # Real-time CPU and RAM monitoring
├── Theme/
│   └── Theme.swift
├── Views/
│   ├── Components/SimpleComponents.swift
│   ├── ContentView.swift           # Start/stop server, quick controls
│   └── ModelDownloadView.swift     # Browse/download/manage models
└── Assets.xcassets/
```

## Dependencies

- SwiftNIO (HTTP server)
- SwiftUI/AppKit (UI)
- MLX‑Swift, MLXLLM (runtime and generation)

## Building from source

- Requirements: macOS 15.5+, Apple Silicon, Xcode 16.4+
- Open `osaurus.xcodeproj` and run the `osaurus` target
- Configure port and CORS in the app’s settings (gear icon)

## API compatibility

- OpenAI-compatible: `/v1/models`, `/v1/chat/completions` (SSE and non-streaming)
- Ollama-compatible: `/chat` (NDJSON stream), plus `/tags`
- Path normalization: all endpoints accept `/v1`, `/api`, `/v1/api`

## Notes & Limitations

- Apple Silicon only (MLX); Intel Macs are not supported
- Localhost by default and no auth; use a proxy if exposing
- `/transcribe` endpoints are placeholders pending Whisper integration

## Contributing

- Read the Contributing Guide and Code of Conduct:
  - https://github.com/dinoki-ai/osaurus/blob/main/CONTRIBUTING.md
  - https://github.com/dinoki-ai/osaurus/blob/main/CODE_OF_CONDUCT.md
- Security policy: https://github.com/dinoki-ai/osaurus/blob/main/SECURITY.md
- Good first issues: https://github.com/dinoki-ai/osaurus/labels/good%20first%20issue
