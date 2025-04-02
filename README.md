# UI Kit Monorepo with Rspack

This is a monorepo containing a UI Kit based on Shadcn UI components and a documentation site built with React and TypeScript, all bundled with Rspack for fast builds.

## Project Structure

```
has-ui-kit-v4/
├── packages/
│   ├── ui-kit/         # UI Kit package with Shadcn UI components
│   │   ├── src/        # Source code for UI Kit components
│   │   └── ...
│   ├── docs/           # Documentation site
│   │   ├── src/        # Source code for documentation site
│   │   └── ...
└── ...
```

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/has-ui-kit-v4.git
cd has-ui-kit-v4
```

2. Install dependencies:

```bash
npm install
```

## Development

### Build the UI Kit

```bash
npm run build:ui-kit
```

### Start the Documentation site

```bash
npm run start:docs
```

This will start a development server at [http://localhost:3000](http://localhost:3000).

### Build the Documentation site

```bash
npm run build:docs
```

### Build everything

```bash
npm run build
```

## Adding New Components to the UI Kit

1. Create a new directory in `packages/ui-kit/src` for your component
2. Add your component implementation (see Button.tsx as an example)
3. Export the component from `packages/ui-kit/src/index.ts`
4. Rebuild the UI Kit

## UI Kit Components

The UI Kit includes the following components:

- Button: A versatile button component with multiple variants and sizes
- Input: A customizable input component

Each component follows the Shadcn UI pattern, leveraging Radix UI primitives and Tailwind CSS for styling.

## Publishing

To publish the UI Kit to npm:

1. Update the version in `packages/ui-kit/package.json`
2. Build the UI Kit
3. Run `npm publish --workspace=ui-kit`

## License

MIT
