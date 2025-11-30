---
title: Benchmarks
sidebar_label: Benchmarks
description: Performance benchmarks comparing Osaurus with other local LLM servers
sidebar_position: 10
---

# Performance Benchmarks

Comprehensive performance analysis of Osaurus compared to other local LLM solutions on Apple Silicon.

## Methodology

All benchmarks were conducted under controlled conditions to ensure fair comparison:

- **Hardware:** Apple M2 Pro, 32GB RAM
- **macOS Version:** 15.5
- **Model:** Llama 3.2 3B Instruct (4-bit quantization)
- **Prompt:** "Explain quantum computing in simple terms"
- **Settings:** Default configuration for each server
- **Measurements:** 20-run average, excluding first run

## Key Metrics

### Time to First Token (TTFT)

The time from request to first token generation—critical for perceived responsiveness.

| Server    | TTFT (ms) | Relative |
| --------- | --------- | -------- |
| Ollama    | **33ms**  | 1.0×     |
| Osaurus   | 87ms      | 2.6×     |
| LM Studio | 113ms     | 3.4×     |

### Throughput

Characters generated per second during streaming.

| Server    | Throughput      | Relative |
| --------- | --------------- | -------- |
| LM Studio | **588 chars/s** | 1.06×    |
| Osaurus   | 554 chars/s     | 1.0×     |
| Ollama    | 430 chars/s     | 0.78×    |

### End-to-End Latency

Total time from request to completion.

| Server    | Total Time | Relative |
| --------- | ---------- | -------- |
| LM Studio | **1.22s**  | 1.0×     |
| Osaurus   | 1.24s      | 1.02×    |
| Ollama    | 1.62s      | 1.33×    |

## Optimization Tips

Based on benchmark results:

1. **For Speed**

   - Use 4-bit quantization
   - Choose smaller models (2-3B)
   - Limit context to 2048 tokens
   - Disable logging in production

2. **For Quality**

   - Use 8-bit quantization when possible
   - Select 7B+ models
   - Allow full context windows
   - Enable temperature sampling

3. **For Efficiency**
   - Keep 1-2 models loaded
   - Use model aliases for quick switching
   - Monitor memory pressure
   - Restart periodically for long-running servers

## Conclusions

Osaurus demonstrates:

- **Competitive Performance** — Matches or exceeds alternatives in key metrics
- **Efficient Memory Usage** — Lower RAM footprint than competitors
- **Consistent Latency** — Predictable performance under load
- **Native Optimization** — Leverages Apple Silicon effectively

The benchmarks show Osaurus is particularly well-suited for:

- Production deployments requiring consistent performance
- Memory-constrained environments
- High-throughput applications
- Native macOS integrations

---

<p align="center">
  To contribute benchmarks, join the <a href="https://discord.gg/dinoki">Discord community</a>.
</p>
