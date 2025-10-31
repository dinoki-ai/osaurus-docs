---
title: Installation
sidebar_label: Installation
description: Install Osaurus via Homebrew or download the latest signed build from GitHub Releases.
sidebar_position: 2
---

# Installation

Osaurus is available as a native macOS application for Apple Silicon. Choose your preferred installation method.

## System Requirements

- **macOS 15.5** or later
- **Apple Silicon** (M1, M2, M3, or newer)
- **100MB** free space for the application
- **2-8GB** free space per model

> **Note:** Apple Foundation Models require macOS 26 Tahoe or later. Osaurus automatically detects and enables this feature when available.

## Homebrew Installation

The recommended installation method is through Homebrew:

```bash
brew install --cask osaurus
```

This installation includes:

- Osaurus.app in your Applications folder
- Command-line interface via `osaurus` command
- Automatic updates through `brew upgrade`

### CLI Configuration

The CLI is embedded within the application bundle. If the `osaurus` command isn't available after installation:

**Quick Setup:**

```bash
ln -sf "/Applications/Osaurus.app/Contents/MacOS/osaurus" "$(brew --prefix)/bin/osaurus" || \
ln -sf "$HOME/Applications/Osaurus.app/Contents/MacOS/osaurus" "$(brew --prefix)/bin/osaurus"
```

**Using the Helper Script:**

```bash
# Download and run the setup script
curl -fsSL https://raw.githubusercontent.com/dinoki-ai/osaurus/main/scripts/setup-cli.sh | bash

# Or manually:
/Applications/Osaurus.app/Contents/MacOS/setup-cli.sh
```

The script automatically:

- Detects your shell configuration
- Creates the appropriate symlink
- Updates your PATH if needed

### Updating via Homebrew

```bash
# Update Homebrew formulae
brew update

# Upgrade Osaurus
brew upgrade osaurus

# Or upgrade all casks
brew upgrade --cask
```

## Direct Download

Download the latest signed build directly from GitHub:

1. Visit [GitHub Releases](https://github.com/dinoki-ai/osaurus/releases/latest)
2. Download the latest DMG file (e.g., Osaurus-1.0.0-universal.dmg)
3. Open the DMG file
4. Drag Osaurus to your Applications folder
5. Eject the DMG

### First Launch

When launching Osaurus for the first time:

1. **Right-click** Osaurus.app and select **Open**
2. Click **Open** in the security dialog
3. Grant necessary permissions when prompted

> This step is only required once. Osaurus is properly signed but not notarized.

### Manual CLI Setup

After installing the app, set up the CLI:

```bash
# Create symlink to CLI
sudo ln -sf /Applications/Osaurus.app/Contents/MacOS/osaurus /usr/local/bin/osaurus

# Verify installation
osaurus --version
```

## Building from Source

For development or customization, build Osaurus from source.

### Prerequisites

- **Xcode 16.4** or later
- **Command Line Tools**
- **Git**

### Build Process

```bash
# Clone the repository
git clone https://github.com/dinoki-ai/osaurus.git
cd osaurus

# Install dependencies
npm install

# Build the application
npm run build

# The built app will be in: build/Release/Osaurus.app
```

### Development Mode

```bash
# Run in development mode
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

## Installation Verification

Verify your installation:

```bash
# Check CLI version
osaurus --version

# Test server startup
osaurus serve --port 1337

# Check server status
osaurus status

# Stop server
osaurus stop
```

### GUI Verification

1. Launch Osaurus from Applications or Spotlight
2. Look for the menu bar icon
3. Click the icon and select **About**
4. Verify the version number

## Permissions

Osaurus requires minimal permissions:

- **Network Access** — For serving the local API
- **File System Access** — For model storage

No administrator privileges are required for normal operation.

## Model Storage

Models are stored in:

```
~/Library/Containers/ai.dinoki.osaurus/Data/Library/Application Support/models/
```

Each model typically requires:

- **2-4GB** for 4-bit quantized models
- **4-8GB** for 8-bit quantized models
- **8-16GB** for larger or less quantized models

## Troubleshooting

### "Cannot be opened" Error

If macOS prevents opening Osaurus:

1. Go to **System Settings** → **Privacy & Security**
2. Find Osaurus in the security section
3. Click **Open Anyway**

### CLI Not Found

If the `osaurus` command isn't recognized:

```bash
# Check if app exists
ls /Applications/Osaurus.app/Contents/MacOS/osaurus

# Add to PATH manually
echo 'export PATH="/Applications/Osaurus.app/Contents/MacOS:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Permission Denied

If you get permission errors:

```bash
# Make CLI executable
chmod +x /Applications/Osaurus.app/Contents/MacOS/osaurus

# Use without sudo for user-level operations
osaurus serve  # Correct
sudo osaurus serve  # Not recommended
```

## Uninstallation

### Via Homebrew

```bash
brew uninstall --cask osaurus
```

### Manual Uninstallation

1. Quit Osaurus from the menu bar
2. Delete from Applications:
   ```bash
   rm -rf /Applications/Osaurus.app
   ```
3. Remove CLI symlink:
   ```bash
   rm /usr/local/bin/osaurus
   ```
4. Optional - Remove application data:
   ```bash
   rm -rf ~/Library/Containers/ai.dinoki.osaurus
   ```

## Next Steps

Once installed, proceed to:

- [Quickstart Guide](/quickstart) — Get running in minutes
- [Model Management](/models) — Download your first model
- [Configuration](/configuration) — Customize settings

---

<p align="center">
  Need help? Visit our <a href="https://discord.gg/dinoki">Discord community</a> or check the <a href="https://github.com/dinoki-ai/osaurus/issues">GitHub issues</a>.
</p>
