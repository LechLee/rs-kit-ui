# Rs UI Kit v4

A modern React component library powered by Rspack for fast builds, featuring automated documentation generation and AI integration.

## 🏗️ Architecture

This is a monorepo using PNPM workspaces with the following packages:

- **`packages/ui-kit/`** - Core UI component library based on Radix UI primitives
- **`packages/playground/`** - Demo application to showcase and test components  
- **`packages/mcp-server/`** - MCP server for documentation automation and AI integration

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- PNPM (v8.15.4 or higher)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd rs-ui-kit-v4

# Install dependencies
pnpm install

# Start development mode
pnpm dev
```

### Using the UI Kit

```bash
# Install in your project
pnpm add @rs-kit/ui-kit

# Import components
import { Button, Card, Input } from "@rs-kit/ui-kit"
```

## 📚 Documentation System

This project features a comprehensive automated documentation system with version tracking and AI integration.

### 🔧 Available Commands

#### Development
```bash
# Start both UI library and playground in development mode
pnpm dev

# Start only the playground application
pnpm playground

# Build all packages
pnpm build

# Build UI library only
pnpm build:ui-kit

# Clean all node_modules and dist folders
pnpm clean
```

#### Documentation & Samples
```bash
# Documentation management
pnpm docs:check              # Check documentation status
pnpm docs:generate           # Generate docs for outdated components
pnpm docs:watch              # Watch for component changes

# Sample analysis (for AI integration)
pnpm docs:analyze-samples    # Analyze playground samples
pnpm docs:extract-examples   # Extract examples for documentation
pnpm test:samples           # Test sample integration

# MCP server for AI integration
pnpm mcp:start              # Start MCP server
pnpm test:mcp               # Test MCP functionality
```

#### Component Management
```bash
# Add new shadcn component
cd packages/ui-kit
npx shadcn@latest add -a -y -o

# Publish package
cd packages/ui-kit
npm publish --access public
```

## 📚 Documentation Features

### Automated Documentation System
- **Version Tracking**: Automatically detects component changes using content hashing
- **Template System**: Mustache-style templates with variable substitution and conditionals
- **Content Generation**: TypeScript prop extraction, variant detection, and API reference generation
- **Real-time Updates**: Live monitoring with `pnpm docs:watch`

### Component Annotations
All components include standardized version annotations:

```typescript
/**
 * @component Button
 * @version 1.1.0
 * @lastModified 2025-06-20
 * @description A customizable button component with ripple effect support
 * @status stable
 */
```


## 🏗️ Project Structure

```
rs-ui-kit-v4/
├── packages/
│   ├── ui-kit/                 # Core component library
│   │   ├── components/
│   │   │   ├── ui/            # Standard UI components (45 components)
│   │   │   └── custom/        # Custom components (3 components)
│   │   ├── hooks/             # React hooks (2 hooks)
│   │   ├── lib/               # Utility functions (2 utilities)
│   │   ├── rslib.config.mjs   # Rslib configuration
│   │   └── index.ts           # Main exports
│   │
│   ├── playground/            # Demo application
│   │   ├── src/
│   │   │   └── samples/       # Component examples
│   │   └── rsbuild.config.mjs # Rsbuild configuration
│   │
│   └── mcp-server/            # Documentation automation
│       ├── src/
│       │   ├── extractors/    # Component analysis
│       │   ├── generators/    # Documentation generation
│       │   ├── schemas/       # TypeScript interfaces
│       │   ├── services/      # Core services
│       │   ├── scripts/       # CLI tools
│       │   ├── templates/     # Documentation templates
│       │   └── utils/         # Helper utilities
│       └── tsconfig.json
│
├── docs/                      # Documentation files
│   ├── components/           # Generated component docs
│   ├── README.md            # Documentation overview
│   ├── version-tracking.md  # Version system details
│   └── todo.md              # Implementation roadmap
│
├── .version-registry.yml    # Component version registry
├── CLAUDE.md               # Project instructions
└── package.json            # Root package configuration
```

## 🔧 Technology Stack

- **Build Tools**: Rspack via Rslib (ui-kit) and Rsbuild (playground)
- **UI Framework**: React 19
- **Component Base**: Radix UI primitives  
- **Styling**: Tailwind CSS with CSS variables
- **Package Manager**: PNPM with workspaces
- **TypeScript**: Full TypeScript support with declaration generation
- **Documentation**: Custom template system with version tracking
- **AI Integration**: MCP (Model Context Protocol) server

## 📦 Component Library

### Core Components (52 components)

#### Form Controls
- `Button` - Customizable button with ripple effects and variants
- `Input` - Text input with validation and styling options
- `Textarea` - Multi-line text input component
- `Select` - Dropdown selection with search and options
- `Checkbox` - Binary choice input component
- `Switch` - Toggle switch component for boolean options
- `Slider` - Range input slider component
- `RadioGroup` - Radio button group for single selections
- `Form` - Form wrapper with validation and field management
- `Label` - Form label component with accessibility features
- `InputOTP` - One-time password input component

#### Layout & Navigation
- `Card` - Flexible container with header, content, and footer
- `Sheet` - Slide-out panel component for secondary content
- `Dialog` - Modal dialog component for focused interactions
- `Tabs` - Tabbed interface component for content organization
- `Accordion` - Collapsible content container with multiple panels
- `Sidebar` - Collapsible sidebar navigation component
- `NavigationMenu` - Navigation menu with nested items
- `Breadcrumb` - Navigation component showing page hierarchy
- `Separator` - Visual divider component for content sections

#### Data Display
- `Table` - Data table component with sorting and styling
- `Badge` - Small status indicator or label component
- `Avatar` - User profile image with fallback initials
- `Alert` - Feedback component for displaying important messages
- `Progress` - Progress indicator component for completion status
- `Skeleton` - Placeholder component for loading states
- `Chart` - Recharts-based components for data visualization

#### Overlays & Floating Elements
- `Tooltip` - Floating tooltip component for additional information
- `Popover` - Floating content container component
- `HoverCard` - Floating card that appears on hover
- `ContextMenu` - Right-click context menu component
- `DropdownMenu` - Dropdown menu with multiple action items
- `Command` - Command palette and search interface
- `AlertDialog` - Modal dialog for critical confirmations
- `Menubar` - Horizontal menu bar with dropdown menus

#### Specialized Components
- `Calendar` - Date picker and calendar interface
- `Carousel` - Slideshow component for displaying multiple items
- `Resizable` - Resizable panel components with drag handles
- `ScrollArea` - Custom scrollable container with styled scrollbars
- `Toggle` - Toggle button component
- `ToggleGroup` - Group of toggle buttons
- `Pagination` - Pagination component for navigating pages
- `Collapsible` - Component that can be expanded or collapsed
- `AspectRatio` - Container maintaining specific aspect ratio

#### Toast & Notifications
- `Toast` - Notification toast component system
- `Toaster` - Toast notification manager component

### Custom Components (3 components)
- `DatePickerBottomSheet` - Mobile-optimized date picker interface
- `MobileNumberInput` - International phone number input
- `ProgressChart` - Advanced progress visualization component

### Hooks (2 hooks)
- `use-mobile` - Hook for detecting mobile devices
- `use-toast` - Hook for managing toast notifications

### Utilities (2 utilities)
- `utils` - Common utility functions and helpers
- `cn` - Class name utility for conditional styling

## 🎨 Styling System

### Design Tokens
- **Colors**: Semantic color system with light/dark mode support
- **Typography**: Responsive font scale with proper hierarchy
- **Spacing**: Consistent spacing scale for layouts
- **Shadows**: Layered shadow system for depth
- **Borders**: Radius and border utilities for consistency

### Variant System
Components use `class-variance-authority` (cva) for consistent variant handling:

```typescript
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)
```

## 🤖 AI Integration

The Rs UI Kit includes an MCP (Model Context Protocol) server that provides AI assistants with intelligent component discovery and code generation capabilities.

### Quick Setup

1. **Start the MCP server**: `pnpm mcp:start`
2. **Configure your AI assistant** with the server path
3. **Test integration**: `pnpm test:mcp`

### Available Tools
- **Component Discovery** - Search and explore components by name, category, or use case
- **Code Generation** - Generate realistic component usage code from playground samples
- **Documentation Access** - Get component info, props, variants, and examples
- **Pattern Recognition** - Find components based on usage patterns and complexity

### Example Usage
Ask your AI assistant: *"I need a login form with email and password inputs"*

The AI will generate complete, working code using the appropriate Form, Input, and Button components with proper TypeScript types and accessibility features.

**For detailed setup and examples**, see the [MCP Integration Guide](./docs/mcp-integration-guide.md).

## 🔧 Adding MCP to Claude Code

To integrate the Rs UI Kit MCP server with Claude Code for AI-powered development:

### 1. Build the MCP Server
```bash
# From the ui-kit root directory
pnpm build
cd packages/mcp-server
pnpm build
```

### 2. Configure Claude Code
Add the MCP server to your Claude Code configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "rs-ui-kit": {
      "command": "node",
      "args": [
        "/absolute/path/to/rs-ui-kit-v4/packages/mcp-server/dist/server.js"
      ],
      "cwd": "/absolute/path/to/rs-ui-kit-v4"
    }
  }
}
```

### 3. Restart and Test
1. Restart Claude Code completely
2. Start a new conversation
3. Ask: "Search for button components" to test the integration

### 4. Available Commands
Once integrated, you can use natural language to:
- **Discover components**: "Show me all form components"
- **Generate code**: "Create a login form with validation"
- **Get documentation**: "What props does the Button component accept?"
- **Find patterns**: "I need components for a dashboard layout"

## 🛠️ Development Workflow

### Adding Components
1. Create component in `packages/ui-kit/components/ui/`
2. Add version annotation and export from `index.ts`
3. Create playground sample in `packages/playground/src/samples/`
4. Generate documentation: `pnpm docs:generate`

### Automated Features
- **Version tracking** with content hashing
- **Documentation generation** from TypeScript AST parsing
- **Real-time monitoring** with `pnpm docs:watch`



## 🤝 Contributing

1. Fork the repository and create a feature branch
2. Add version annotations to new components
3. Test in playground and generate documentation
4. Submit a pull request with clear description

### Guidelines
- Follow TypeScript and accessibility best practices
- Use semantic versioning for component updates
- Include proper component annotations and exports

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- **Documentation**: See `/docs` directory for detailed guides
- **Issues**: Report bugs via GitHub Issues  
- **MCP Integration**: Follow the [MCP Integration Guide](./docs/mcp-integration-guide.md)

### Quick Reference

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start development servers |
| `pnpm build` | Build all packages |
| `pnpm docs:check` | Check documentation status |
| `pnpm docs:generate` | Generate documentation |
| `pnpm mcp:start` | Start MCP server for AI integration |

---

**Built with React 19, TypeScript, Tailwind CSS, and Rspack**