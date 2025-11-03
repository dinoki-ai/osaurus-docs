---
title: Configuration
sidebar_label: Configuration
description: Configure Osaurus settings, preferences, and advanced options
sidebar_position: 6
---

# Configuration

Osaurus has minimal server configuration. Most behavior is controlled per request via the OpenAI-compatible API. The following settings are supported:

## Supported settings

- **Server port**  
  Default: 1337  
  Change this in the app: Osaurus menu bar → Settings → Server Port.

- **Listen address**  
  Binds to 127.0.0.1 (local only) by default.

- **CORS**  
  Enabled for development with `Access-Control-Allow-Origin: *`. Not currently configurable.

- **Path prefixes**  
  Endpoints are available under `/v1`, `/api`, or `/v1/api`.

## Not supported

The following configuration mechanisms are not available at this time:

- Environment variables (e.g., `OSAURUS_*`)
- TLS/SSL termination
- Custom CORS origin lists
- Global model aliases
- Configuration profiles
- CLI config export/import

For managing models (download location, adding/removing models), see the Models guide.
