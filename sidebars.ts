import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "Overview",
    },
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "installation",
          label: "Installation",
        },
        {
          type: "doc",
          id: "quickstart",
          label: "Quick Start",
        },
        {
          type: "doc",
          id: "cli",
          label: "CLI Reference",
        },
      ],
    },
    {
      type: "category",
      label: "MCP & Tools",
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "tools",
          label: "Tools & Plugins",
        },
        {
          type: "doc",
          id: "plugin-authoring",
          label: "Plugin Authoring",
        },
      ],
    },
    {
      type: "category",
      label: "Configuration",
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "configuration",
          label: "Basic Configuration",
        },
        {
          type: "doc",
          id: "shared-configuration",
          label: "Shared Configuration",
        },
        {
          type: "doc",
          id: "models",
          label: "Model Management",
        },
        {
          type: "doc",
          id: "models/apple-intelligence",
          label: "Apple Intelligence",
        },
      ],
    },
    {
      type: "category",
      label: "Development",
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api",
          label: "API Reference",
        },
        {
          type: "doc",
          id: "sdk-examples",
          label: "SDK Examples",
        },
        {
          type: "doc",
          id: "integrations",
          label: "Integrations",
        },
      ],
    },
    {
      type: "category",
      label: "Features",
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "personas",
          label: "Personas",
        },
        {
          type: "doc",
          id: "voice",
          label: "Voice Input",
        },
        {
          type: "doc",
          id: "multi-window",
          label: "Multi-Window",
        },
      ],
    },
    {
      type: "category",
      label: "Resources",
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "benchmarks",
          label: "Benchmarks",
        },
        {
          type: "doc",
          id: "developer",
          label: "Developer Guide",
        },
        {
          type: "doc",
          id: "keyboard-shortcuts",
          label: "Keyboard Shortcuts",
        },
      ],
    },
  ],
};

export default sidebars;
