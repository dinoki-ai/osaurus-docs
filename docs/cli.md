---
sidebar_position: 3
---

# CLI Reference

The Osaurus CLI provides a command-line interface for managing the Osaurus server, allowing you to start, stop, and monitor the server programmatically.

## Installation

### Development Installation

If `osaurus` isn't found in your `PATH`, you can install a development symlink:

```bash
make install-cli
```

### Homebrew Installation

If you installed Osaurus via Homebrew cask, the app bundle includes the CLI. The cask attempts to link it automatically; if not, create a symlink:

```bash
ln -sf "/Applications/Osaurus.app/Contents/MacOS/osaurus" "$(brew --prefix)/bin/osaurus" || \
ln -sf "$HOME/Applications/Osaurus.app/Contents/MacOS/osaurus" "$(brew --prefix)/bin/osaurus"
```

Or use the helper script:

```bash
curl -fsSL https://raw.githubusercontent.com/dinoki-ai/osaurus/main/scripts/install_cli_symlink.sh | bash
```

## Commands

### `osaurus serve`

Start the Osaurus server with specified options.

```bash
osaurus serve [OPTIONS]
```

#### Options

- `--port PORT` - The port to run the server on (default: 1337)
- `--expose` - Expose the server to your local network (binds to 0.0.0.0)
- `--yes` - Skip confirmation prompts (useful for non-interactive environments)
- `--port PORT` and `--expose` do not change Apple Foundation Models availability; AFM support is detected automatically on macOS 26 (Tahoe) only.

#### Examples

Start server on localhost only (default):

```bash
osaurus serve --port 1337
```

Start server exposed on your LAN (will prompt for confirmation):

```bash
osaurus serve --port 1337 --expose
```

Start server exposed without prompt (non-interactive):

```bash
osaurus serve --port 1337 --expose --yes
```

:::warning Network Security
When using `--expose`, the server binds to `0.0.0.0` and is accessible from your local network. There is no authentication, so only use this on trusted networks or behind a reverse proxy.
:::

### `osaurus status`

Check the current status of the Osaurus server.

```bash
osaurus status
```

This command will show:

- Whether the server is running
- The port it's running on
- The bind address (localhost or exposed)

### `osaurus stop`

Stop the running Osaurus server.

```bash
osaurus stop
```

## Server Management

### Binding Behavior

- **Default (without `--expose`)**: Server binds to `127.0.0.1` (localhost only)
- **With `--expose`**: Server binds to `0.0.0.0` (accessible from LAN)

### Management Protocol

The CLI communicates with the Osaurus app using macOS Distributed Notifications. This means:

- Management is local-only
- There are no HTTP start/stop endpoints
- The CLI must be run on the same machine as the Osaurus app

## Environment Variables

### `OSU_MODELS_DIR`

Override the default model storage location:

```bash
export OSU_MODELS_DIR="/path/to/your/models"
osaurus serve
```

Default location: `~/MLXModels`

## Integration with Scripts

The CLI is designed to work well in automated scripts and CI/CD pipelines:

```bash
#!/bin/bash

# Start Osaurus server
osaurus serve --port 8080 --yes &

# Wait for server to be ready
sleep 5

# Check status
osaurus status

# Run your tests or operations
# ...

# Stop the server
osaurus stop
```

## Troubleshooting

### Command not found

If you get a "command not found" error:

1. For development builds, run `make install-cli`
2. For Homebrew installations, ensure `/opt/homebrew/bin` (Apple Silicon) or `/usr/local/bin` (Intel) is in your `PATH`

### Server won't start

1. Check if another process is using the port:

   ```bash
   lsof -i :1337
   ```

2. Ensure the Osaurus app is installed and accessible

3. Check the Osaurus app logs in Console.app

### Can't connect from another device

If using `--expose` but can't connect from another device:

1. Check your firewall settings
2. Ensure both devices are on the same network
3. Use the server machine's IP address, not `localhost`

## See Also

- [Quick Start Guide](/quickstart) - Get started with Osaurus
- [API Reference](/api) - Complete API documentation
- [Configuration](/configuration) - Server configuration options
