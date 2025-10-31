---
title: Model Management
sidebar_label: Models
description: Complete guide to managing, downloading, and using models in Osaurus
sidebar_position: 4
---

# Model Management

Osaurus supports a wide variety of MLX-optimized models and Apple Foundation Models. This guide covers model selection, management, and optimization.

## Model Recommendations

### Best Overall Performance

**Llama 3.2 3B Instruct (4-bit)**

- Excellent quality and speed balance
- 2GB download size
- Suitable for most tasks
- Performs well on 8GB+ systems

### Code Generation

**DeepSeek Coder 7B (4-bit)**

- Specialized for programming tasks
- Strong multi-language support
- 4GB download size
- Ideal for code reviews and generation

### Maximum Speed

**Gemma 2 2B Instruct (4-bit)**

- Ultra-fast response times
- 1.5GB download size
- Good for simple tasks
- Runs efficiently on all M-series Macs

### Highest Quality

**Llama 3.2 8B Instruct (4-bit)**

- Superior quality under 10B parameters
- 5GB download size
- More nuanced responses
- Recommended for 16GB+ RAM

## Model Manager

Access the Model Manager through the Osaurus menu bar icon.

### Downloading Models

1. Click the Osaurus menu bar icon
2. Select **Model Manager**
3. Browse or search for models
4. Click **Download** on your chosen model
5. Monitor progress in the download queue

### Model Information

Each model displays:

- **Name** — Model identifier
- **Size** — Download and disk size
- **Quantization** — Bit precision (4-bit, 8-bit)
- **Parameters** — Model size in billions
- **Download Status** — Current state

### Managing Storage

Models are stored in:

```
~/Library/Containers/ai.dinoki.osaurus/Data/Library/Application Support/models/
```

To remove models:

1. Open Model Manager
2. Find the downloaded model
3. Click **Delete**
4. Confirm removal

## Model Types

### MLX Models

MLX models are optimized specifically for Apple Silicon:

- **4-bit Quantization** — Best speed/quality trade-off
- **8-bit Quantization** — Higher quality, more memory
- **16-bit** — Maximum quality, significant memory usage

### Apple Foundation Models

Available on macOS 26 Tahoe or later:

```bash
# Use with model ID "foundation"
curl -X POST http://127.0.0.1:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "foundation",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

Features:

- System-integrated model
- No download required
- Optimized for Apple Silicon
- Privacy-focused design

## Model Naming Convention

Osaurus uses consistent model naming:

```
{model-family}-{version}-{size}-{variant}-{quantization}
```

Examples:

- `llama-3.2-3b-instruct-4bit`
- `mistral-7b-instruct-v0.2-4bit`
- `deepseek-coder-7b-instruct-4bit`

## Performance Characteristics

### Memory Requirements

| Model Size | 4-bit   | 8-bit   | 16-bit   |
| ---------- | ------- | ------- | -------- |
| 2-3B       | 2-3GB   | 4-6GB   | 8-12GB   |
| 7-8B       | 4-5GB   | 8-10GB  | 16-20GB  |
| 13B        | 8-10GB  | 16-20GB | 32-40GB  |
| 30B+       | 20-25GB | 40-50GB | 80-100GB |

### Speed Benchmarks

Typical tokens per second on M2:

| Model | 4-bit | 8-bit |
| ----- | ----- | ----- |
| 3B    | 40-60 | 30-45 |
| 7B    | 20-35 | 15-25 |
| 13B   | 12-20 | 8-15  |

## Model Configuration

### Context Length

Default context lengths by model family:

- **Llama 3.2** — 4096 tokens
- **Mistral** — 8192 tokens
- **Qwen 2.5** — 32768 tokens
- **DeepSeek** — 4096 tokens

### Temperature Settings

Recommended temperature ranges:

- **Creative Writing** — 0.7-1.0
- **Code Generation** — 0.1-0.3
- **General Chat** — 0.5-0.7
- **Factual Responses** — 0.0-0.3

### System Prompts

Configure default system prompts in Settings:

```python
{
  "model": "llama-3.2-3b-instruct-4bit",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful, concise assistant."
    },
    {
      "role": "user",
      "content": "Explain quantum computing"
    }
  ]
}
```

## Model Selection Guide

### By Use Case

**General Purpose**

- Llama 3.2 3B/8B
- Mistral 7B
- Qwen 2.5 3B/7B

**Programming**

- DeepSeek Coder 7B
- Code Llama 7B/13B
- Qwen 2.5 Coder

**Creative Writing**

- Llama 3.2 8B
- Mistral 7B
- Neural Chat 7B

**Technical/Scientific**

- Llama 3.2 8B
- Qwen 2.5 7B
- Mistral 7B

### By System Resources

**8GB RAM**

- 2-3B models (4-bit)
- Single model at a time

**16GB RAM**

- 7-8B models (4-bit)
- 3B models (8-bit)
- Multiple small models

**32GB+ RAM**

- 13B models (4-bit)
- 7-8B models (8-bit)
- Larger context windows

## Advanced Configuration

### Model Aliases

Create custom model names in `~/.osaurus/config.json`:

```json
{
  "model_aliases": {
    "gpt-3.5-turbo": "llama-3.2-3b-instruct-4bit",
    "gpt-4": "llama-3.2-8b-instruct-4bit"
  }
}
```

### Preloading Models

Keep frequently used models in memory:

```bash
osaurus serve --preload llama-3.2-3b-instruct-4bit
```

### Custom Model Paths

Load models from custom locations:

```bash
osaurus serve --model-path /path/to/models
```

## Troubleshooting

### Model Not Found

1. Verify model is downloaded in Model Manager
2. Check exact model name:
   ```bash
   curl http://127.0.0.1:1337/v1/models
   ```
3. Ensure correct spelling and format

### Slow Performance

1. Check Activity Monitor for memory pressure
2. Try smaller or more quantized models
3. Close unnecessary applications
4. Reduce context length in requests

### Download Issues

1. Check internet connection
2. Verify available disk space
3. Try pausing and resuming download
4. Check Model Manager logs

### Memory Errors

1. Monitor RAM usage during inference
2. Switch to more quantized versions
3. Reduce max_tokens in requests
4. Consider smaller models

## Model Updates

Osaurus periodically updates available models:

1. New models appear automatically in Model Manager
2. Updated versions are marked with badges
3. Old versions remain usable until deleted
4. Check GitHub releases for model announcements

---

<p align="center">
  Questions about models? Join our <a href="https://discord.gg/dinoki">Discord community</a> or check the <a href="/benchmarks">benchmarks page</a>.
</p>
