---
title: CLI Reference
sidebar_label: CLI
description: Complete command-line interface documentation for Osaurus
sidebar_position: 8
---

# CLI Reference

The Osaurus CLI provides command-line control over your local LLM server. This guide covers all available commands and options.

## Quick Start

```bash
# Start server
osaurus serve

# Open UI
osaurus ui

# Check status
osaurus status

# Stop server
osaurus stop
```

## Installation

The CLI is embedded in the Osaurus application bundle.

### Homebrew Installation

When installed via Homebrew, the CLI is automatically linked.

### Manual Setup

If the `osaurus` command is not found:

**Quick Symlink:**

```bash
ln -sf "/Applications/Osaurus.app/Contents/MacOS/osaurus" "$(brew --prefix)/bin/osaurus" || \
ln -sf "$HOME/Applications/Osaurus.app/Contents/MacOS/osaurus" "$(brew --prefix)/bin/osaurus"
```

**Helper Script:**

```bash
curl -fsSL https://raw.githubusercontent.com/dinoki-ai/osaurus/main/scripts/install_cli_symlink.sh | bash
```

**Add to PATH:**

```bash
echo 'export PATH="/Applications/Osaurus.app/Contents/MacOS:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

## Commands

### osaurus serve

Start the Osaurus server with specified options.

```bash
osaurus serve [options]
```

**Options:**

| Option         | Description             | Default              |
| -------------- | ----------------------- | -------------------- |
| `--port`, `-p` | Server port number      | 1337                 |
| `--expose`     | Enable LAN access       | false                |
| `--models-dir` | Custom models directory | ~/Library/.../models |
| `--log-level`  | Logging verbosity       | info                 |
| `--preload`    | Preload specific model  | none                 |
| `--concurrent` | Max concurrent requests | 10                   |

**Examples:**

```bash
# Default start
osaurus serve

# Custom port
osaurus serve --port 8080

# Enable LAN access
osaurus serve --expose

# Verbose logging
osaurus serve --log-level debug

# Preload model
osaurus serve --preload llama-3.2-3b-instruct-4bit
```

### osaurus status

Check server status and display running configuration.

```bash
osaurus status
```

**Output Example:**

```
Osaurus Server Status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status:     Running
Port:       1337
PID:        12345
Uptime:     2h 15m
Models:     3 loaded
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### osaurus stop

Stop the running Osaurus server.

```bash
osaurus stop
```

**Options:**

| Option    | Description                |
| --------- | -------------------------- |
| `--force` | Force stop without cleanup |

### osaurus ui

Open the Osaurus graphical interface.

```bash
osaurus ui
```

This launches the Osaurus app if not already running and brings it to the foreground.

### osaurus models

Manage downloaded models.

```bash
osaurus models [subcommand]
```

**Subcommands:**

#### list

Display all downloaded models:

```bash
osaurus models list
```

Output:

```
Available Models
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
llama-3.2-3b-instruct-4bit    2.1 GB
mistral-7b-instruct-v0.2-4bit  4.2 GB
deepseek-coder-7b-4bit         4.0 GB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 10.3 GB
```

#### info

Get detailed model information:

```bash
osaurus models info llama-3.2-3b-instruct-4bit
```

#### delete

Remove a downloaded model:

```bash
osaurus models delete llama-3.2-3b-instruct-4bit
```

#### download

Download a model from the registry:

```bash
osaurus models download llama-3.2-8b-instruct-4bit
```

### osaurus config

Manage Osaurus configuration.

```bash
osaurus config [subcommand]
```

**Subcommands:**

#### show

Display current configuration:

```bash
osaurus config show
```

#### set

Update configuration values:

```bash
osaurus config set port 8080
osaurus config set log_level debug
osaurus config set expose true
```

#### reset

Reset to default configuration:

```bash
osaurus config reset
```

### osaurus logs

View and manage server logs.

```bash
osaurus logs [options]
```

**Options:**

| Option           | Description             | Default |
| ---------------- | ----------------------- | ------- |
| `--follow`, `-f` | Follow log output       | false   |
| `--lines`, `-n`  | Number of lines to show | 50      |
| `--level`        | Filter by log level     | all     |

**Examples:**

```bash
# View last 50 lines
osaurus logs

# Follow logs
osaurus logs -f

# Show errors only
osaurus logs --level error

# Last 100 lines
osaurus logs -n 100
```

### osaurus chat

Interactive chat session from the terminal.

```bash
osaurus chat [options]
```

**Options:**

| Option          | Description             | Default                    |
| --------------- | ----------------------- | -------------------------- |
| `--model`, `-m` | Model to use            | llama-3.2-3b-instruct-4bit |
| `--system`      | System prompt           | none                       |
| `--temperature` | Sampling temperature    | 0.7                        |
| `--max-tokens`  | Maximum response tokens | 2048                       |

**Example:**

```bash
# Start chat with specific model
osaurus chat -m mistral-7b-instruct-v0.2-4bit

# With system prompt
osaurus chat --system "You are a helpful coding assistant"
```

**Chat Commands:**

- `/exit` or `/quit` — Exit chat
- `/clear` — Clear conversation
- `/model <name>` — Switch model
- `/system <prompt>` — Update system prompt
- `/save <filename>` — Save conversation
- `/help` — Show commands

### osaurus api

Make API requests directly from CLI.

```bash
osaurus api [endpoint] [options]
```

**Examples:**

```bash
# List models
osaurus api /v1/models

# Chat completion
osaurus api /v1/chat/completions \
  --data '{
    "model": "llama-3.2-3b-instruct-4bit",
    "messages": [{"role": "user", "content": "Hello"}]
  }'

# With pretty output
osaurus api /v1/models --pretty
```

### osaurus version

Display version information.

```bash
osaurus version
```

**Options:**

| Option    | Description       |
| --------- | ----------------- |
| `--check` | Check for updates |

## Environment Variables

Configure Osaurus using environment variables:

```bash
# Server configuration
export OSAURUS_PORT=8080
export OSAURUS_EXPOSE=true
export OSAURUS_LOG_LEVEL=debug

# Model settings
export OSAURUS_MODELS_DIR=/custom/path/to/models
export OSAURUS_DEFAULT_MODEL=llama-3.2-3b-instruct-4bit

# Performance
export OSAURUS_MAX_CONCURRENT=20
export OSAURUS_REQUEST_TIMEOUT=300
```

## Configuration File

Osaurus uses a JSON configuration file at `~/.osaurus/config.json`:

```json
{
  "port": 1337,
  "expose": false,
  "log_level": "info",
  "models_dir": "~/Library/Containers/ai.dinoki.osaurus/Data/Library/Application Support/models",
  "default_model": "llama-3.2-3b-instruct-4bit",
  "max_concurrent": 10,
  "request_timeout": 300,
  "model_aliases": {
    "gpt-3.5-turbo": "llama-3.2-3b-instruct-4bit",
    "gpt-4": "llama-3.2-8b-instruct-4bit"
  }
}
```

## Advanced Usage

### Running as a Service

Create a launchd service for automatic startup:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>ai.dinoki.osaurus</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Applications/Osaurus.app/Contents/MacOS/osaurus</string>
        <string>serve</string>
        <string>--port</string>
        <string>1337</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
```

Save to `~/Library/LaunchAgents/ai.dinoki.osaurus.plist` and load:

```bash
launchctl load ~/Library/LaunchAgents/ai.dinoki.osaurus.plist
```

### Shell Completion

Enable tab completion for bash/zsh:

```bash
# Bash
echo 'source <(osaurus completion bash)' >> ~/.bashrc

# Zsh
echo 'source <(osaurus completion zsh)' >> ~/.zshrc
```

### Debugging

Enable debug logging for troubleshooting:

```bash
# Verbose logging
osaurus serve --log-level debug

# Log to file
osaurus serve 2>&1 | tee osaurus.log

# Environment debug
OSAURUS_DEBUG=1 osaurus serve
```

## Common Workflows

### Development Setup

```bash
# Start server with custom port
osaurus serve --port 8080 --log-level debug

# In another terminal, test the API
osaurus api /v1/models --pretty

# Start interactive chat
osaurus chat -m llama-3.2-3b-instruct-4bit
```

### Production Deployment

```bash
# Start with optimal settings
osaurus serve \
  --port 80 \
  --expose \
  --preload llama-3.2-3b-instruct-4bit \
  --concurrent 50 \
  --log-level warn
```

### Model Testing

```bash
# Download new model
osaurus models download mistral-7b-instruct-v0.2-4bit

# Test model
osaurus chat -m mistral-7b-instruct-v0.2-4bit

# Compare models
osaurus api /v1/chat/completions \
  --data '{"model": "mistral-7b-instruct-v0.2-4bit", "messages": [{"role": "user", "content": "Test prompt"}]}'
```

## Troubleshooting

### Command Not Found

1. Verify Osaurus.app is installed
2. Check symlink exists: `ls -la $(which osaurus)`
3. Add to PATH manually if needed

### Permission Denied

```bash
# Make executable
chmod +x /Applications/Osaurus.app/Contents/MacOS/osaurus

# Check permissions
ls -la /Applications/Osaurus.app/Contents/MacOS/osaurus
```

### Server Won't Start

1. Check if already running: `osaurus status`
2. Check port availability: `lsof -i :1337`
3. Review logs: `osaurus logs --level error`
4. Try different port: `osaurus serve --port 8080`

---

<p align="center">
  Need help? Check our <a href="https://discord.gg/dinoki">Discord community</a> or file an issue on <a href="https://github.com/dinoki-ai/osaurus/issues">GitHub</a>.
</p>
