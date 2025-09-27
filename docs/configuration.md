---
title: Configuration
sidebar_label: Configuration
description: Models directory, CORS settings, and network exposure.
sidebar_position: 7
---

## Models directory

- Default: `~/MLXModels`
- Override with env var: `OSU_MODELS_DIR`

## CORS

Built-in CORS support for browser clients.

- Disabled by default (no CORS headers sent)
- Enable via UI: gear icon → Advanced Settings → CORS Settings → Allowed Origins
  - Comma-separated list, e.g.: `http://localhost:3000, http://127.0.0.1:5173, https://app.example.com`
  - Use `*` to allow any origin (recommended only for local dev)
- To access from other devices, also enable “Expose to network” in Network Settings

Behavior when enabled:

- Allowed requests get `Access-Control-Allow-Origin` (specific origin or `*`)
- Preflight `OPTIONS` requests → `204 No Content` with:
  - `Access-Control-Allow-Methods`: echoes request or defaults to `GET, POST, OPTIONS, HEAD`
  - `Access-Control-Allow-Headers`: echoes request or defaults to `Content-Type, Authorization`
  - `Access-Control-Max-Age: 600`
- Streaming endpoints include CORS headers in responses

Quick example (browser fetch):

```javascript
await fetch("http://127.0.0.1:1337/v1/chat/completions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "llama-3.2-3b-instruct-4bit",
    messages: [{ role: "user", content: "Hello!" }],
  }),
});
```

Notes

- Leave the field empty to disable CORS entirely
- `*` cannot be combined with credentials (Osaurus doesn’t use cookies)

## App integration

If you’re integrating from a macOS or Electron app and want to discover/connect to a running Osaurus instance, see:

- Shared Configuration: How to discover Osaurus via a JSON file and connect programmatically.

See: [Shared Configuration](./shared-configuration.md)
