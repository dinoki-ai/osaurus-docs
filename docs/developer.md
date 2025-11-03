---
title: Developer Guide
sidebar_label: Developer Guide
description: Comprehensive guide for developers building and contributing to Osaurus
sidebar_position: 10
---

# Developer Guide

This guide provides everything you need to know about developing Osaurus, from building the project to contributing code.

## 🏗️ Architecture Overview

Osaurus is built with a clean, modular architecture:

```
┌─────────────────┐     ┌─────────────────┐
│   SwiftUI App   │────▶│   Menu Bar UI   │
└────────┬────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│ ServerController│────▶│  SwiftNIO HTTP  │
└────────┬────────┘     └────────┬────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│  Model Manager  │     │   API Handler   │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────┬───────────────┘
                 ▼
         ┌─────────────────┐
         │   MLX Service   │
         └─────────────────┘
```

## 📁 Project Structure

```
osaurus/
├── Core/                           # App lifecycle
│   ├── AppDelegate.swift          # macOS app delegate
│   └── osaurusApp.swift           # SwiftUI app entry point
│
├── Controllers/                    # Business logic controllers
│   ├── ServerController.swift     # HTTP server lifecycle management
│   ├── ModelManager.swift         # Model discovery & downloads
│   └── HotKeyManager.swift        # Global hotkey registration
│
├── Models/                         # Data models
│   ├── InternalMessage.swift      # Internal message types
│   ├── MLXModel.swift             # MLX model representation
│   ├── OpenAIAPI.swift            # OpenAI-compatible DTOs
│   ├── ResponseWriters.swift      # SSE and NDJSON writers
│   ├── ServerConfiguration.swift  # Server config model
│   ├── ChatConfiguration.swift    # Chat config model
│   └── ServerHealth.swift         # Health check model
│
├── Networking/                     # Network layer
│   ├── HTTPHandler.swift          # HTTP request handling
│   ├── Router.swift               # URL routing with normalization
│   └── AsyncHTTPHandler.swift     # Async request processing
│
├── Services/                       # Core services
│   ├── DirectoryPickerService.swift    # File system access
│   ├── FoundationModelService.swift    # Apple Intelligence integration
│   ├── HuggingFaceService.swift        # Model repository access
│   ├── LoginItemService.swift          # Auto-start functionality
│   ├── MLXService.swift                # MLX inference engine
│   ├── ModelService.swift              # Model management
│   ├── PromptBuilder.swift             # Chat template formatting
│   ├── SearchService.swift             # Model search
│   ├── SharedConfigurationService.swift # Inter-app communication
│   ├── SystemMonitorService.swift      # CPU/RAM monitoring
│   └── UpdaterService.swift            # App updates
│
├── Theme/                          # UI theming
│   └── Theme.swift                # Colors, fonts, styling
│
├── Views/                          # SwiftUI views
│   ├── Components/                # Reusable UI components
│   ├── ContentView.swift          # Main app view
│   ├── ModelDownloadView.swift    # Model browser
│   ├── ChatView.swift             # Chat interface
│   └── SettingsView.swift         # Configuration UI
│
├── Resources/                      # Assets and resources
│   ├── Assets.xcassets/          # Images and colors
│   └── Info.plist                # App metadata
│
└── CLI/                           # Command-line interface
    └── main.swift                # CLI entry point
```

## 🛠️ Development Setup

### Prerequisites

- **macOS 15.5+** on Apple Silicon
- **Xcode 16.4+** with Command Line Tools
- **Swift 6.0+**
- **Git**

### Clone and Build

```bash
# Clone the repository
git clone https://github.com/dinoki-ai/osaurus.git
cd osaurus

# Open in Xcode
open osaurus.xcodeproj

# Or build from command line
xcodebuild -scheme osaurus -configuration Debug
```

### Running in Development

1. **In Xcode:**

   - Select the `osaurus` scheme
   - Choose your Mac as the run destination
   - Press ⌘R to build and run

2. **Debug Console:**

   - View logs in Xcode's console
   - Set breakpoints for debugging
   - Use lldb commands for inspection

3. **SwiftUI Previews:**
   - Available for most views
   - Press ⌘⌥P to refresh previews

## 🔧 Key Components

### ServerController

Manages the HTTP server lifecycle:

```swift
class ServerController: ObservableObject {
    @Published var isRunning = false
    @Published var port = 1337
    @Published var isExposed = false

    func start() async throws {
        // Initialize SwiftNIO event loop
        // Bind to configured address
        // Start accepting connections
    }

    func stop() async {
        // Gracefully shutdown server
        // Clean up resources
    }
}
```

### MLXService

Handles model loading and inference:

```swift
class MLXService {
    private var loadedModel: MLXModel?
    private var sessionCache: [String: InferenceSession] = [:]

    func loadModel(_ name: String) async throws -> MLXModel {
        // Check cache first
        // Load model from disk
        // Initialize tokenizer
        // Warm up model
    }

    func generate(
        prompt: String,
        maxTokens: Int,
        temperature: Float
    ) -> AsyncStream<String> {
        // Tokenize input
        // Run inference
        // Stream tokens
        // Handle stop sequences
    }
}
```

### Router

Handles API path normalization:

```swift
struct Router {
    static func normalize(_ path: String) -> String {
        // Remove common prefixes (/v1, /api, etc.)
        // Standardize paths
        // Return canonical route
    }

    static func route(_ request: HTTPRequest) -> Handler? {
        let path = normalize(request.uri)
        switch path {
        case "/models": return ModelsHandler()
        case "/chat/completions": return ChatHandler()
        // ... more routes
        default: return nil
        }
    }
}
```

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
xcodebuild test -scheme osaurus

# Run specific test
xcodebuild test -scheme osaurus -only-testing:osaurusTests/MLXServiceTests
```

### Integration Tests

```python
# test_integration.py
import pytest
import requests

def test_chat_completion():
    response = requests.post(
        "http://localhost:1337/v1/chat/completions",
        json={
            "model": "llama-3.2-3b-instruct-4bit",
            "messages": [{"role": "user", "content": "Hello"}]
        }
    )
    assert response.status_code == 200
    assert "choices" in response.json()
```

### Performance Testing

```bash
# Run benchmark suite
./scripts/run_bench.sh

# Profile with Instruments
xcrun xctrace record --template "Time Profiler" --launch osaurus
```

## 🎨 UI Development

### SwiftUI Best Practices

```swift
// Use @StateObject for view models
struct ChatView: View {
    @StateObject private var viewModel = ChatViewModel()

    var body: some View {
        // Use ViewBuilder for complex layouts
        // Prefer computed properties
        // Extract reusable components
    }
}

// Create reusable components
struct MessageBubble: View {
    let message: ChatMessage

    var body: some View {
        Text(message.content)
            .padding()
            .background(bubbleColor)
            .cornerRadius(12)
    }

    private var bubbleColor: Color {
        message.role == .user ? .blue : .gray
    }
}
```

### Theme System

```swift
extension Color {
    static let osaurusPrimary = Color("AccentColor")
    static let osaurusBackground = Color("BackgroundColor")
}

extension Font {
    static let osaurusTitle = Font.system(.largeTitle, design: .rounded)
    static let osaurusBody = Font.system(.body)
}
```

## 🔌 Adding New Features

### 1. New Model Support

```swift
// 1. Add model definition
struct NewModel: MLXModel {
    let architecture = "new_arch"
    let tokenizer = "new_tokenizer"
}

// 2. Update model registry
ModelRegistry.register(NewModel.self, for: "new_arch")

// 3. Add to UI
ModelManager.suggestedModels.append(
    SuggestedModel(name: "New Model", repo: "org/model")
)
```

### 2. New API Endpoint

```swift
// 1. Create handler
class CustomHandler: HTTPHandler {
    func handle(_ request: HTTPRequest) async -> HTTPResponse {
        // Process request
        // Return response
    }
}

// 2. Add route
Router.addRoute("/custom", handler: CustomHandler())

// 3. Document in OpenAPI
```

### 3. New Settings

```swift
// 1. Add to configuration model
struct ServerConfiguration {
    var newSetting: Bool = false
}

// 2. Add UI control
Toggle("New Feature", isOn: $config.newSetting)

// 3. Persist to UserDefaults
@AppStorage("newSetting") var newSetting = false
```

## 📦 Dependencies

### Core Dependencies

- **SwiftNIO** - High-performance HTTP server
- **MLX-Swift** - ML framework for Apple Silicon
- **MLXLLM** - LLM-specific MLX extensions

### Development Dependencies

- **SwiftLint** - Code linting
- **XCTest** - Unit testing
- **Instruments** - Performance profiling

### Package Management

```swift
// Package.swift
dependencies: [
    .package(url: "https://github.com/ml-explore/mlx-swift", from: "0.10.0"),
    .package(url: "https://github.com/apple/swift-nio.git", from: "2.50.0"),
]
```

## 🐛 Debugging

### Common Issues

**Model Loading Failures**

```swift
// Check model path
print(modelPath.path)

// Verify files exist
let requiredFiles = ["config.json", "model.safetensors"]
for file in requiredFiles {
    assert(FileManager.default.fileExists(atPath: modelPath.appendingPathComponent(file).path))
}
```

**Memory Issues**

```swift
// Monitor memory usage
let memory = ProcessInfo.processInfo.physicalMemory
print("Available memory: \(memory / 1024 / 1024 / 1024)GB")

// Force model unload
MLXService.shared.unloadModel()
```

**Network Errors**

```swift
// Enable verbose logging
HTTPHandler.logLevel = .trace

// Check port binding
netstat -an | grep 1337
```

### Debug Helpers

```swift
// Add debug commands
#if DEBUG
extension ChatView {
    func debugMenu() -> some View {
        Menu("Debug") {
            Button("Clear Cache") { MLXService.shared.clearCache() }
            Button("Print Stats") { printDebugStats() }
            Button("Force Crash") { fatalError("Debug crash") }
        }
    }
}
#endif
```

## 🚀 Performance Optimization

### Model Loading

- Cache loaded models in memory
- Implement lazy loading
- Use memory mapping for weights

### Inference

- Batch similar requests
- Implement request queuing
- Use streaming for long outputs

### UI Responsiveness

- Offload heavy work to background queues
- Use SwiftUI's task modifier
- Implement progressive loading

## 🤝 Contributing

### Code Style

Follow Swift style guide:

- Use descriptive names
- Document public APIs
- Keep functions focused
- Prefer immutability

### Pull Request Process

1. Fork and create feature branch
2. Write tests for new features
3. Update documentation
4. Run SwiftLint
5. Submit PR with description

### Commit Messages

```
feat: Add support for new model architecture
fix: Resolve memory leak in streaming responses
docs: Update API documentation
test: Add integration tests for tool calling
refactor: Simplify router implementation
```

## 📚 Resources

### Documentation

- [Swift Documentation](https://docs.swift.org)
- [SwiftNIO Guide](https://apple.github.io/swift-nio/docs/current/NIO/index.html)
- [MLX Documentation](https://ml-explore.github.io/mlx/build/html/index.html)

### Tools

- [Xcode](https://developer.apple.com/xcode/)
- [Swift Package Manager](https://swift.org/package-manager/)
- [Instruments](https://help.apple.com/instruments/mac/current/)

### Community

- [Discord](https://discord.gg/dinoki) - Get help and discuss
- [GitHub Issues](https://github.com/dinoki-ai/osaurus/issues) - Report bugs
- [GitHub Discussions](https://github.com/dinoki-ai/osaurus/discussions) - Ideas and questions

## 🔐 Security

### Best Practices

- Validate all inputs
- Sanitize file paths
- Use secure random for IDs
- Implement rate limiting
- Log security events

### Reporting Issues

See [SECURITY.md](https://github.com/dinoki-ai/osaurus/blob/main/SECURITY.md) for reporting vulnerabilities.

---

<p align="center">
  <strong>Ready to contribute?</strong><br/>
  Check out <a href="https://github.com/dinoki-ai/osaurus/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22">good first issues</a> to get started!
</p>
