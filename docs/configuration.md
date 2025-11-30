---
title: Configuration
sidebar_label: Configuration
description: Configure Osaurus settings, environment variables, and server options
sidebar_position: 6
---

# Configuration

Osaurus is designed to work out of the box with sensible defaults. Most behavior is controlled per request via the API. This page covers the available configuration options.

## Environment Variables

Configure Osaurus using environment variables:

| Variable | Description | Default |
| -------- | ----------- | ------- |
| `OSU_PORT` | Server port number | `1337` |
| `OSU_MODELS_DIR` | Custom models directory | `~/MLXModels` |

### Setting Environment Variables

**Temporary (current session):**

```bash
OSU_PORT=8080 osaurus serve
```

**Persistent (shell profile):**

```bash
# Add to ~/.zshrc or ~/.bashrc
export OSU_PORT=8080
export OSU_MODELS_DIR=/Volumes/External/MLXModels

# Reload shell
source ~/.zshrc
```

## Server Settings

### Port

Default: `1337`

Change the server port:

- **Environment variable:** `OSU_PORT=8080`
- **CLI flag:** `osaurus serve --port 8080`
- **UI:** Menu bar → Settings → Server Port

### Listen Address

Default: `127.0.0.1` (localhost only)

To expose the server on your local network:

```bash
osaurus serve --expose
```

This binds to `0.0.0.0`, making the server accessible from other devices on your network.

:::warning Security Note
Only use `--expose` on trusted networks. The server has no authentication.
:::

### CORS

Cross-Origin Resource Sharing is enabled by default for development:

- **Allowed Origins:** `*` (all origins)
- **Allowed Methods:** `GET, POST, OPTIONS`
- **Allowed Headers:** `Content-Type, Authorization`

CORS settings are not currently configurable.

## Model Storage

Models are stored at:

```
~/MLXModels
```

Override with `OSU_MODELS_DIR`:

```bash
export OSU_MODELS_DIR=/Volumes/ExternalDrive/Models
```

The directory structure:

```
~/MLXModels/
├── llama-3.2-3b-instruct-4bit/
│   ├── config.json
│   ├── model.safetensors
│   └── tokenizer.json
├── mistral-7b-instruct-v0.2-4bit/
│   └── ...
└── ...
```

## Tools Storage

Installed plugins are stored at:

```
~/Library/Application Support/com.dinoki.osaurus/Tools/<plugin_id>/<version>/
```

This location is not configurable.

## API Path Prefixes

Endpoints are available under multiple prefixes for compatibility:

- `/v1/endpoint` — OpenAI style
- `/api/endpoint` — Generic style  
- `/v1/api/endpoint` — Combined style

All prefixes route to the same handlers.

## Not Currently Configurable

The following features are not configurable at this time:

- TLS/SSL termination (use a reverse proxy)
- Custom CORS origin lists
- Global model aliases
- Authentication/API keys
- Request rate limiting
- Configuration profiles
- CLI config files

## Per-Request Configuration

Most model behavior is controlled per-request via API parameters:

```json
{
  "model": "llama-3.2-3b-instruct-4bit",
  "messages": [{"role": "user", "content": "Hello"}],
  "temperature": 0.7,
  "max_tokens": 1000,
  "top_p": 0.9,
  "stream": true
}
```

See the [API Reference](/api) for all available parameters.

## Recommended Configurations

### Development

```bash
# Default settings work well
osaurus serve
```

### Team/LAN Access

```bash
# Expose on network
osaurus serve --expose --port 1337
```

### Custom Model Location

```bash
# External drive for large models
export OSU_MODELS_DIR=/Volumes/ModelsDrive/MLXModels
osaurus serve
```

### Multiple Instances

```bash
# Terminal 1
OSU_PORT=1337 osaurus serve

# Terminal 2
OSU_PORT=1338 osaurus serve
```

---

<p align="center">
  For model-specific configuration, see the <a href="/models">Model Management</a> guide.
</p>
