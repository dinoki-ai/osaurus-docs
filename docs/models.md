---
title: Models
sidebar_label: Models
description: Managing models and naming conventions.
sidebar_position: 4
---

- Curated suggestions include Llama, Qwen, Gemma, Mistral, Phi, DeepSeek, etc. (4‑bit variants for speed)
- Discovery pulls from Hugging Face `mlx-community` and computes size estimates
- Required files are fetched automatically (tokenizer/config/weights)
- Change the models directory with `OSU_MODELS_DIR` (see Configuration)

## Apple Foundation Models

When your system is running macOS 26 (Tahoe), Osaurus adds a virtual `foundation` entry to `/v1/models` representing the system default model. You can select it with `model: "foundation"` or `model: "default"`.

See the deep‑dive: [Apple Intelligence](./models/apple-intelligence.md).

### Naming tip

Model names are lower-cased with hyphens (derived from the friendly name), e.g.:

- `Llama 3.2 3B Instruct 4bit` → `llama-3.2-3b-instruct-4bit`
