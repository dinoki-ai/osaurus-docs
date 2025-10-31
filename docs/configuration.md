---
title: Configuration
sidebar_label: Configuration
description: Configure Osaurus settings, preferences, and advanced options
sidebar_position: 6
---

# Configuration

Osaurus provides flexible configuration options through the graphical interface, configuration files, and environment variables.

## Settings Interface

Access settings through the Osaurus menu bar:

1. Click the Osaurus icon in the menu bar
2. Select **Settings** or press **⌘,**

### General Settings

**Server Port**  
Default: 1337  
The port on which the API server listens.

**Allow LAN Access**  
Default: Disabled  
Enable to access Osaurus from other devices on your network.

**Launch at Login**  
Default: Disabled  
Automatically start Osaurus when you log in to your Mac.

**Start Server on Launch**  
Default: Disabled  
Automatically start the API server when Osaurus launches.

### Model Settings

**Default Model**  
Select the model to use by default in the chat interface.

**Model Load Timeout**  
Default: 30 seconds  
Maximum time to wait for a model to load.

**Keep Models in Memory**  
Default: Enabled  
Keep loaded models in memory between requests for faster responses.

**Maximum Loaded Models**  
Default: 2  
Number of models that can be loaded simultaneously.

### Chat Settings

**System Prompt**  
Default system message for all chat conversations.

**Temperature**  
Default: 0.7  
Controls response randomness (0.0 = deterministic, 2.0 = very random).

**Max Tokens**  
Default: 2048  
Maximum number of tokens to generate per response.

**Chat History**  
Default: Enabled  
Save chat conversations locally.

### Advanced Settings

**Log Level**  
Options: Error, Warning, Info, Debug  
Controls the verbosity of server logs.

**Request Timeout**  
Default: 300 seconds  
Maximum time for a single request.

**CORS Origins**  
Default: \* (all origins)  
Allowed origins for cross-origin requests.

## Configuration File

Osaurus stores configuration in:

```
~/.osaurus/config.json
```

### File Structure

```json
{
  "server": {
    "port": 1337,
    "expose": false,
    "cors_origins": ["*"]
  },
  "models": {
    "default": "llama-3.2-3b-instruct-4bit",
    "directory": "~/Library/Containers/ai.dinoki.osaurus/Data/Library/Application Support/models",
    "keep_loaded": true,
    "max_loaded": 2,
    "aliases": {
      "gpt-3.5-turbo": "llama-3.2-3b-instruct-4bit",
      "gpt-4": "llama-3.2-8b-instruct-4bit",
      "claude-3-sonnet": "mistral-7b-instruct-v0.2-4bit"
    }
  },
  "chat": {
    "system_prompt": "You are a helpful assistant.",
    "temperature": 0.7,
    "max_tokens": 2048,
    "save_history": true
  },
  "performance": {
    "request_timeout": 300,
    "max_concurrent": 10,
    "streaming_chunk_size": 32
  },
  "logging": {
    "level": "info",
    "file": "~/.osaurus/osaurus.log",
    "max_size": "100MB",
    "max_files": 5
  }
}
```

### Configuration Options

#### Server Configuration

| Option         | Type    | Description             | Default |
| -------------- | ------- | ----------------------- | ------- |
| `port`         | integer | API server port         | 1337    |
| `expose`       | boolean | Enable LAN access       | false   |
| `cors_origins` | array   | Allowed CORS origins    | ["*"]   |
| `ssl_cert`     | string  | Path to SSL certificate | null    |
| `ssl_key`      | string  | Path to SSL key         | null    |

#### Model Configuration

| Option         | Type    | Description                  | Default                      |
| -------------- | ------- | ---------------------------- | ---------------------------- |
| `default`      | string  | Default model ID             | "llama-3.2-3b-instruct-4bit" |
| `directory`    | string  | Models storage path          | "~/Library/.../models"       |
| `keep_loaded`  | boolean | Keep models in memory        | true                         |
| `max_loaded`   | integer | Maximum loaded models        | 2                            |
| `load_timeout` | integer | Model load timeout (seconds) | 30                           |
| `aliases`      | object  | Model name mappings          | {}                           |

#### Chat Configuration

| Option          | Type    | Description             | Default                        |
| --------------- | ------- | ----------------------- | ------------------------------ |
| `system_prompt` | string  | Default system message  | "You are a helpful assistant." |
| `temperature`   | float   | Sampling temperature    | 0.7                            |
| `max_tokens`    | integer | Maximum response tokens | 2048                           |
| `top_p`         | float   | Nucleus sampling        | 0.9                            |
| `save_history`  | boolean | Save chat history       | true                           |
| `history_path`  | string  | Chat history location   | "~/.osaurus/history"           |

#### Performance Configuration

| Option                 | Type    | Description                 | Default   |
| ---------------------- | ------- | --------------------------- | --------- |
| `request_timeout`      | integer | Request timeout (seconds)   | 300       |
| `max_concurrent`       | integer | Maximum concurrent requests | 10        |
| `streaming_chunk_size` | integer | Streaming chunk size        | 32        |
| `gpu_layers`           | integer | GPU layers to use           | -1 (auto) |
| `thread_count`         | integer | CPU threads                 | -1 (auto) |

## Environment Variables

Override configuration using environment variables:

```bash
# Server settings
export OSAURUS_PORT=8080
export OSAURUS_EXPOSE=true

# Model settings
export OSAURUS_DEFAULT_MODEL=mistral-7b-instruct-v0.2-4bit
export OSAURUS_MODELS_DIR=/custom/models/path

# Performance
export OSAURUS_MAX_CONCURRENT=20
export OSAURUS_GPU_LAYERS=32

# Logging
export OSAURUS_LOG_LEVEL=debug
```

Priority order:

1. Environment variables (highest)
2. Configuration file
3. Default values (lowest)

## Model Aliases

Create custom model names for compatibility:

```json
{
  "models": {
    "aliases": {
      "gpt-3.5-turbo": "llama-3.2-3b-instruct-4bit",
      "gpt-4": "llama-3.2-8b-instruct-4bit",
      "claude-3-sonnet": "mistral-7b-instruct-v0.2-4bit",
      "custom-model": "qwen-2.5-7b-instruct-4bit"
    }
  }
}
```

Use aliases in API calls:

```bash
curl -X POST http://127.0.0.1:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

## Advanced Configuration

### SSL/TLS Support

Enable HTTPS for the API server:

```json
{
  "server": {
    "port": 443,
    "ssl_cert": "/path/to/cert.pem",
    "ssl_key": "/path/to/key.pem"
  }
}
```

### Custom CORS Configuration

Restrict CORS to specific origins:

```json
{
  "server": {
    "cors_origins": [
      "http://localhost:3000",
      "https://myapp.com",
      "https://*.myapp.com"
    ]
  }
}
```

### Logging Configuration

Configure detailed logging:

```json
{
  "logging": {
    "level": "debug",
    "file": "~/.osaurus/osaurus.log",
    "max_size": "100MB",
    "max_files": 5,
    "format": "json",
    "include_timestamps": true
  }
}
```

### Performance Tuning

Optimize for your hardware:

```json
{
  "performance": {
    "gpu_layers": 32,
    "thread_count": 8,
    "batch_size": 512,
    "context_size": 4096,
    "streaming_chunk_size": 64
  }
}
```

## Profiles

Create multiple configuration profiles:

### Development Profile

`~/.osaurus/profiles/dev.json`:

```json
{
  "server": {
    "port": 8080,
    "expose": true
  },
  "logging": {
    "level": "debug"
  }
}
```

### Production Profile

`~/.osaurus/profiles/prod.json`:

```json
{
  "server": {
    "port": 80,
    "expose": false
  },
  "logging": {
    "level": "error"
  },
  "performance": {
    "max_concurrent": 50
  }
}
```

Load profile:

```bash
osaurus serve --profile prod
```

## Backup and Restore

### Backup Configuration

```bash
# Backup all Osaurus data
tar -czf osaurus-backup.tar.gz \
  ~/.osaurus/config.json \
  ~/.osaurus/profiles \
  ~/.osaurus/history
```

### Restore Configuration

```bash
# Restore from backup
tar -xzf osaurus-backup.tar.gz -C ~/
```

### Export/Import Settings

Export current configuration:

```bash
osaurus config export > osaurus-config.json
```

Import configuration:

```bash
osaurus config import < osaurus-config.json
```

## Configuration Best Practices

1. **Security**

   - Disable LAN access unless needed
   - Use SSL for production deployments
   - Restrict CORS origins appropriately

2. **Performance**

   - Adjust max_concurrent based on hardware
   - Tune GPU layers for optimal speed
   - Monitor memory usage with multiple models

3. **Reliability**

   - Set appropriate timeouts
   - Configure logging for debugging
   - Create backups before major changes

4. **Development**
   - Use profiles for different environments
   - Enable debug logging during development
   - Test configuration changes incrementally

---

<p align="center">
  For specific use cases, see our <a href="/shared-configuration">Shared Configuration Guide</a> or ask in our <a href="https://discord.gg/dinoki">Discord community</a>.
</p>
