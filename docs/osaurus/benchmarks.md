---
title: Benchmarks
sidebar_label: Benchmarks
description: Summary metrics and how to reproduce.
---

The following are 20-run averages from the batch benchmark suite.

| Server    | Model                      | TTFT avg (ms) | Total avg (ms) | Chars/s avg | TTFT rel | Total rel | Chars/s rel | Success |
| --------- | -------------------------- | ------------- | -------------- | ----------- | -------- | --------- | ----------- | ------- |
| Osaurus   | llama-3.2-3b-instruct-4bit | 86            | 1314           | 558         | 0%       | 0%        | 0%          | 100%    |
| Ollama    | llama3.2                   | 58            | 1655           | 434         | +32%     | -26%      | -22%        | 100%    |
| LM Studio | llama-3.2-3b-instruct      | 56            | 1203           | 610         | +34%     | +8%       | +9%         | 100%    |

- Metrics: TTFT = time-to-first-token, Total = time to final token, Chars/s = streaming throughput.
- Relative % vs Osaurus baseline: TTFT/Total computed as 1 − other/osaurus; Chars/s as other/osaurus − 1. Positive = better.
- Data sources: `results/osaurus-vs-ollama-lmstudio-batch.summary.json`, `results/osaurus-vs-ollama-lmstudio-batch.results.csv` in the repo.

## Reproduce

Run the script in the repository (requires the upstream project checked out):

```bash
scripts/run_bench.sh
```

This calls `scripts/benchmark_models.py` to run prompts across servers and write results.

