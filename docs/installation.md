---
title: Installation
sidebar_label: Installation
description: Install Osaurus via Homebrew or download the latest signed build from GitHub Releases.
sidebar_position: 2
---

Osaurus runs on Apple Silicon Macs (M1 or newer). Apple Foundation Models require macOS 26 (Tahoe).

## Option 1 — Homebrew (recommended)

```bash
brew install --cask osaurus
```

- This installs the Osaurus app bundle. Launch from Applications or Spotlight. The embedded CLI (`osaurus`) is auto-linked by the cask when available. If the `osaurus` command is not on your PATH, create a symlink:

```bash
ln -sf "/Applications/Osaurus.app/Contents/MacOS/osaurus" "$(brew --prefix)/bin/osaurus" || \
ln -sf "$HOME/Applications/Osaurus.app/Contents/MacOS/osaurus" "$(brew --prefix)/bin/osaurus"
```

Or use the helper script:

```bash
curl -fsSL https://raw.githubusercontent.com/dinoki-ai/osaurus/main/scripts/install_cli_symlink.sh | bash
```

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

1. Launch Osaurus and start the server (default port `1337`)
2. List models via API:

```bash
curl -s http://127.0.0.1:1337/v1/models | jq
```

If you haven’t downloaded a model yet, open the Model Manager in the app and install one (e.g., “Llama 3.2 3B Instruct 4bit”).
