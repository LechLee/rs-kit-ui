# Rs UI Kit

Shadcn UI component library powered by Rspack for fast builds.

## Project Structure

```
├── packages/
│   ├── ui-kit/         # Core UI component library based on Radix UI primitives
│   │   ├── components/ # UI components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utility functions and helpers
│   │   └── ...
│   ├── playground/     # Demo application to showcase and test components
│   │   ├── src/        # Source code for playground app
│   │   └── ...
└── ...
```

## Features

- React 19 compatible components
- Built with Radix UI primitives
- Styled using Tailwind CSS 4
- Type-safe with TypeScript
- Fast builds with Rspack

## Tech Stack

- [React](https://react.dev/)
- [shadcn/ui] (https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Rspack](https://rspack.dev/) & [Rsbuild](https://rsbuild.dev/)
- [PNPM Workspaces](https://pnpm.io/workspaces)

## Prerequisites

- Node.js (v16 or higher)
- PNPM (v8.15.4 or higher)

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

## Development

### Start Development Mode

To start development servers for both the UI library and playground app:

```bash
pnpm dev
```

### Build UI Library Only

```bash
pnpm build:ui-kit
```

### Run Playground Only

```bash
pnpm playground
```

### Build All Packages

```bash
pnpm build
```

### Clean Project

```bash
pnpm clean
```