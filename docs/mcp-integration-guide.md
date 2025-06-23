# MCP Integration Guide

## AI-Powered Development with Rs UI Kit

This guide shows how to integrate the Rs UI Kit MCP (Model Context Protocol) server with AI assistants to accelerate component-based development through intelligent code generation and component discovery.

## 🚀 Quick Start

### 1. Prerequisites

- Node.js (v16 or higher)
- PNPM (v8.15.4 or higher)
- AI assistant with MCP support (Claude Desktop, etc.)

### 2. Install Rs UI Kit

```bash
# Install the UI kit in your project
npm install @rs-kit/ui-kit

# Or with pnpm
pnpm add @rs-kit/ui-kit
```

### 3. Setup MCP Server

Clone the Rs UI Kit repository to access the MCP server:

```bash
git clone https://github.com/your-org/rs-ui-kit-v4
cd rs-ui-kit-v4
pnpm install
```

### 4. Configure AI Assistant

Add the MCP server configuration to your AI assistant (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "rs-ui-kit": {
      "command": "node",
      "args": [
        "/path/to/rs-ui-kit-v4/packages/mcp-server/dist/server.js"
      ],
      "cwd": "/path/to/rs-ui-kit-v4"
    }
  }
}
```

## 🔧 Available MCP Tools

### Component Discovery

#### `search_components`
Find components by name, category, or functionality:

```
Search for "button" components
```
**Result:** Finds Button, Toggle, and related interactive components with descriptions and variants.

#### `get_component_info`
Get detailed information about specific components:

```
Get information about the Button component
```
**Result:** Complete component details including props, variants, exports, and usage examples.

### Code Generation

#### `generate_component_code`
Generate usage code with specified props:

```
Generate Button code with variant="destructive" and size="lg"
```
**Result:**
```tsx
import { Button } from "@rs-kit/ui-kit"

<Button
  variant="destructive"
  size="lg"
>
  Content
</Button>
```

#### `suggest_components`
Get AI-powered component suggestions:

```
I need to create a form with input fields and a submit button
```
**Result:** Suggests Input, FormField, Button components with relevance scores and usage reasons.

### Documentation Management

#### `get_documentation_status`
Check documentation coverage:

```
Show documentation status for all components
```
**Result:** Coverage statistics and list of components needing documentation updates.

#### `generate_documentation`
Generate documentation for components:

```
Generate documentation for Button and Input components
```
**Result:** Creates complete Markdown documentation with API references and examples.

## 💡 Development Workflows

### Workflow 1: Building a Login Form

**1. Ask for component suggestions:**
```
I need to build a login form with email, password inputs and a submit button
```

**AI Response using MCP:**
- Suggests `Input` for email/password fields  
- Suggests `Button` for submit action
- Suggests `Form` and `FormField` for proper form handling
- Provides relevance scores and reasoning

**2. Generate the form structure:**
```
Generate a login form using Input and Button components
```

**AI Response:**
```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, Input, Button } from "@rs-kit/ui-kit"

function LoginForm() {
  return (
    <Form>
      <FormField
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Enter your email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Enter your password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit">
        Login
      </Button>
    </Form>
  )
}
```

### Workflow 2: Creating a Dashboard Layout

**1. Discover layout components:**
```
Show me components for building a dashboard layout
```

**AI Response using MCP:**
- Finds `Card`, `Sidebar`, `NavigationMenu`
- Shows variants and configuration options
- Explains component relationships

**2. Generate dashboard structure:**
```
Create a dashboard with sidebar navigation and content cards
```

**AI Response:**
```tsx
import { 
  Sidebar, 
  SidebarContent, 
  SidebarProvider, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@rs-kit/ui-kit"

function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarContent>
            {/* Navigation items */}
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Analytics content */}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Activity content */}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
```

### Workflow 3: Building Data Tables

**1. Find data display components:**
```
I need to display tabular data with sorting and actions
```

**AI Response using MCP:**
- Suggests `Table` component with sub-components
- Shows `DropdownMenu` for actions
- Suggests `Button` for sorting controls

**2. Generate table implementation:**
```
Create a data table with sorting and row actions using Table and DropdownMenu
```

**AI Response:**
```tsx
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button
} from "@rs-kit/ui-kit"

function DataTable({ data }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

## 🎯 Advanced Usage Patterns

### Real-time Component Discovery

The MCP server maintains a live cache of all components and automatically detects changes:

```
What components have been updated recently?
```

**Result:** Shows components with version changes and documentation status.

### Variant Exploration

Discover all available variants for components:

```
Show me all Button variants with examples
```

**Result:**
- Lists all variants: default, destructive, outline, secondary, ghost, link
- Shows size options: default, sm, lg, icon  
- Provides code examples for each combination

### Accessibility-Focused Development

Find components with accessibility features:

```
I need accessible form components for screen readers
```

**Result:** 
- Prioritizes components with built-in accessibility
- Shows proper ARIA attributes and usage patterns
- Suggests complementary components (Label, FormMessage)

### Performance Optimization

Get bundle size and dependency information:

```
What are the lightest components for a minimal bundle?
```

**Result:**
- Shows component file sizes
- Lists dependencies for each component
- Suggests optimal import patterns

## 🛠️ Development Setup

### Local Development with MCP

1. **Start the MCP server:**
```bash
cd rs-ui-kit-v4
pnpm mcp:start
```

2. **Test MCP functionality:**
```bash
pnpm test:mcp
```

3. **Monitor component changes:**
```bash
pnpm docs:watch
```

### Integration with Build Tools

#### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['@rs-kit/ui-kit']
  }
})
```

#### Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@rs-kit/ui-kit'],
  experimental: {
    optimizePackageImports: ['@rs-kit/ui-kit']
  }
}

module.exports = nextConfig
```

## 📊 Monitoring and Analytics

### Documentation Coverage Tracking

```
Check documentation coverage and generate missing docs
```

**AI Response:**
- Shows current coverage percentage
- Lists components needing documentation
- Offers to generate missing documentation automatically

### Component Usage Analytics

```
Which components are most commonly used together?
```

**AI Response:**
- Analyzes component relationships
- Shows common usage patterns
- Suggests component combinations

## 🔧 Troubleshooting

### Common Issues

#### MCP Server Not Responding
```bash
# Check server status
pnpm test:mcp

# Restart server
pnpm mcp:start
```

#### Component Not Found
```
Search for "missing-component" components
```
**Result:** Shows similar components and suggests alternatives.

#### Version Mismatch
```
Check documentation status for outdated components
```
**Result:** Lists components with version mismatches and offers to update documentation.

### Debug Mode

Enable verbose logging:
```bash
# Set debug environment
DEBUG=mcp:* pnpm mcp:start
```

## 🚀 Production Deployment

### Hosting the MCP Server

For team usage, deploy the MCP server to a shared environment:

```dockerfile
# Dockerfile for MCP server
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### CI/CD Integration

```yaml
# .github/workflows/mcp-server.yml
name: Deploy MCP Server
on:
  push:
    branches: [main]
    paths: ['packages/mcp-server/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test:mcp
      # Deploy to your infrastructure
```

## 📚 Best Practices

### 1. Component Selection
- Use MCP suggestions to discover optimal components for your use case
- Consider accessibility requirements when selecting components
- Check bundle size impact for performance-critical applications

### 2. Code Generation
- Start with basic generated code and customize as needed
- Use advanced generation for complex forms and layouts
- Verify generated TypeScript types match your data models

### 3. Documentation Workflow
- Generate documentation for custom component combinations
- Keep component documentation synchronized with code changes
- Use MCP to validate component usage patterns

### 4. Team Collaboration
- Share MCP server instance across development teams
- Use consistent component discovery patterns
- Document custom component combinations in your project

## 🎓 Learning Resources

### Interactive Examples

Ask the AI assistant with MCP integration:
- "Show me how to build a user profile form"
- "Create a responsive navigation menu"
- "Build a data visualization dashboard"
- "Design an e-commerce product grid"

### Advanced Patterns

- Component composition strategies
- State management with UI components  
- Animation and transition patterns
- Responsive design implementations

---

**Ready to accelerate your development with AI-powered component discovery and code generation!**

The MCP server transforms how you work with the Rs UI Kit by providing intelligent assistance for component selection, code generation, and documentation management through natural language interactions with your AI assistant.