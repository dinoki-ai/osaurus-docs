---
title: Chat Interface
sidebar_label: Chat Interface
description: Access AI from anywhere on your Mac with the Osaurus chat overlay
sidebar_position: 10
---

# Chat Interface

Osaurus includes a beautiful glass-styled chat overlay that you can access from anywhere on your Mac. No browser tabs, no context switching—just press a hotkey and start talking to AI.

## Opening Chat

Press **⌘;** (Command + Semicolon) anywhere on your Mac to open the chat overlay. The overlay appears above your current work, so you can ask questions without losing your place.

Press **⌘;** again to close it, or click outside the overlay.

:::tip
You can customize the global hotkey in Settings if ⌘; conflicts with another app.
:::

## Having a Conversation

Once the chat is open:

1. Type your message in the input field at the bottom
2. Press **Enter** to send
3. Watch the response stream in real-time
4. Continue the conversation as long as you like

The AI remembers your conversation history within the session, so you can ask follow-up questions naturally.

## Chat Features

### Markdown Rendering

Responses are rendered with full Markdown support:

- **Code blocks** with syntax highlighting
- **Headers, lists, and tables**
- **Bold, italic, and inline code**
- **Links** (clickable)

### Copying Messages

Hover over any message to reveal the copy button. Click it to copy the message content to your clipboard—useful for grabbing code snippets or saving responses.

### Stop Generation

If a response is taking too long or going in the wrong direction, click the **Stop** button to interrupt generation. You can then refine your question and try again.

### Model Selection

Use the model dropdown at the top of the chat to switch between:

- **Local models** you've downloaded
- **Cloud providers** you've configured (OpenAI, Anthropic, etc.)
- **Apple Foundation Model** on macOS 26+

The selected model persists across sessions.

## Settings

Click the **gear icon** in the chat header to access settings:

| Setting              | Description                                              |
| -------------------- | -------------------------------------------------------- |
| **System Prompt**    | Default instructions sent with every conversation        |
| **Temperature**      | Controls response creativity (0 = focused, 1 = creative) |
| **Max Tokens**       | Maximum length of responses                              |
| **Stream Responses** | Show responses word-by-word (on by default)              |

## Quick Actions

| Action              | Shortcut          |
| ------------------- | ----------------- |
| Open/close chat     | **⌘;**            |
| Send message        | **Enter**         |
| New line in message | **Shift + Enter** |
| Clear conversation  | **⌘K**            |
| Open settings       | Click gear icon   |

## Menu Bar

When Osaurus is running, you'll see its icon in your menu bar. Click it to:

- **Start/stop the server**
- **Open Model Manager**
- **Access Settings**
- **View status and logs**

The menu bar icon also shows when the server is running and if VAD (voice activity detection) is active.

## Multiple Windows

Want more than one conversation at a time? Osaurus supports multiple independent chat windows:

- Press **⌘N** to open a new window
- Each window can have its own persona
- Windows are completely independent

[Learn more about multi-window →](/multi-window)

## Personas

The chat interface works seamlessly with Personas. When you switch personas:

- The system prompt changes to match the persona
- Available tools update based on persona configuration
- The visual theme changes (if the persona has a custom theme)

[Learn more about personas →](/personas)

## Voice Input

Click the microphone icon in the input area to use voice input. Speak naturally and your words appear as text. All transcription happens locally on your Mac.

[Learn more about voice input →](/voice)

## Tips

- **Be specific** — Detailed questions get better answers
- **Use personas** — Create specialized assistants for different tasks
- **Try different models** — Smaller models are faster; larger models are smarter
- **Enable streaming** — See responses as they're generated for a more interactive feel

---

<p align="center">
  Ready to customize your experience? Learn about <a href="/personas">Personas</a>.
</p>
