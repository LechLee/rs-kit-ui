# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rs UI Kit is a Shadcn UI component library powered by Rspack for fast builds. It's a monorepo using PNPM workspaces with two main packages:

- `packages/ui-kit/` - Core UI component library based on Radix UI primitives
- `packages/playground/` - Demo application to showcase and test components

## Common Development Commands

### Installation
```bash
pnpm install
```

### Development
```bash
# Start both UI library and playground in development mode
pnpm dev

# Start only the playground application
pnpm playground

# Build and watch UI library only
pnpm --filter ui-kit dev
```

### Building
```bash
# Build all packages
pnpm build

# Build only the UI library
pnpm build:ui-kit

# Build using rslib directly in ui-kit package
cd packages/ui-kit && pnpm build
```

### Cleaning
```bash
# Clean all node_modules and dist folders
pnpm clean
```

### Publishing
```bash
# Publish the UI kit package
cd packages/ui-kit
npm publish --access public
```

### Shadcn Component Management
```bash
# Add new shadcn component (run from ui-kit directory)
cd packages/ui-kit
npx shadcn@latest add -a -y -o
```

## Architecture

### Monorepo Structure
- Uses PNPM workspaces for package management
- Workspace packages are linked using `workspace:*` protocol
- Root package.json contains scripts that orchestrate the entire monorepo

### UI Kit Package (`packages/ui-kit/`)
- Built with Rslib (Rspack-based library bundler)
- Configuration in `rslib.config.mjs`
- Uses path alias `@` pointing to package root
- Exports ESM format with TypeScript declarations
- Externalized React dependencies for peer dependency handling
- Component structure follows Shadcn conventions:
  - `components/ui/` - UI components
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions
  - `index.ts` - Main export file

### Playground Package (`packages/playground/`)
- Built with Rsbuild (Rspack-based build tool)  
- Configuration in `rsbuild.config.mjs`
- Showcases all UI components with sample implementations
- Sample files in `src/samples/` demonstrate component usage
- Uses the UI kit as a workspace dependency

### Technology Stack
- **Build Tools**: Rspack via Rslib (ui-kit) and Rsbuild (playground)
- **UI Framework**: React 19
- **Component Base**: Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables
- **Package Manager**: PNPM with workspaces
- **TypeScript**: Full TypeScript support with declaration generation

### Development Workflow
The typical development flow involves running `pnpm dev` which:
1. Starts the UI kit in watch mode (`rslib build --watch`)
2. Starts the playground in development mode (`rsbuild dev`)
3. Hot reloads both when changes are made

Components are developed in the ui-kit package and immediately tested in the playground application.