import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
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
      ],
    },
  ],
};

export default sidebars;
