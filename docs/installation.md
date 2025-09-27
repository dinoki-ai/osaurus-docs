---
title: Installation
sidebar_label: Installation
description: Install Osaurus via Homebrew or download the latest signed build from GitHub Releases.
sidebar_position: 1
---

Osaurus runs on Apple Silicon Macs (M1 or newer) with macOS 15.5+.

## Option 1 — Homebrew (recommended)

```bash
brew install osaurus
```

- This installs Osaurus system-wide. After install, launch the app from Applications or run it from Spotlight.
- To upgrade later:

```bash
brew upgrade osaurus
```

To uninstall:

```bash
brew uninstall osaurus
```

## Option 2 — Direct download

Download the latest signed build from GitHub Releases and drag it to Applications:

- https://github.com/dinoki-ai/osaurus/releases/latest

## Option 3 — Build from source

Requirements: Xcode 16.4+

1. Clone the repository
2. Open `osaurus.xcodeproj` in Xcode
3. Build and run the `osaurus` target

## Verify

1. Launch Osaurus and start the server (default port `8080`)
2. List models via API:

```bash
curl -s http://127.0.0.1:8080/v1/models | jq
```

If you haven’t downloaded a model yet, open the Model Manager in the app and install one (e.g., “Llama 3.2 3B Instruct 4bit”).
