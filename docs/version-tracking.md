# Component Version Tracking System

## Overview

The version tracking system ensures efficient documentation updates by only processing components that have actually changed, rather than scanning all components on every update.

## Architecture

### Component Version Management

#### Version Metadata Integration
Each component includes version metadata that the system uses to track changes:

```typescript
// packages/ui-kit/components/ui/button.tsx
/**
 * @component Button
 * @version 2.1.3
 * @lastModified 2024-01-15
 * @description Primary button component with multiple variants and sizes
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(...)

// Alternative: Export-based versioning
export const BUTTON_VERSION = "2.1.3"
export const BUTTON_LAST_MODIFIED = "2024-01-15T10:30:00Z"
```

### Version Registry Schema

```typescript
// packages/mcp-server/src/schemas/version-registry.ts
interface ComponentVersionRegistry {
  [componentName: string]: {
    currentVersion: string
    lastModified: string
    filePath: string
    documentationVersion: string
    lastDocumentationUpdate: string
    hash: string // File content hash for additional verification
  }
}

interface VersionComparisonResult {
  componentName: string
  needsUpdate: boolean
  versionDiff: {
    current: string
    documented: string
  }
  reason: 'version_mismatch' | 'hash_mismatch' | 'missing_docs' | 'up_to_date'
}
```

## Implementation

### Version Detection System

```typescript
// packages/mcp-server/src/services/version-detector.ts
class VersionDetector {
  async extractComponentVersion(filePath: string): Promise<ComponentVersion>
  async buildVersionRegistry(): Promise<ComponentVersionRegistry>
  async compareVersions(registry: ComponentVersionRegistry): Promise<VersionComparisonResult[]>
  async updateComponentVersion(componentName: string, newVersion: string): Promise<void>
  async getOutdatedComponents(): Promise<string[]>
}

interface ComponentVersion {
  name: string
  version: string
  lastModified: string
  filePath: string
  contentHash: string
}
```

### Incremental Documentation Updates

```typescript
// packages/mcp-server/src/services/incremental-updater.ts
class IncrementalDocumentationUpdater {
  async identifyOutdatedComponents(): Promise<ComponentUpdateTask[]>
  async updateComponent(task: ComponentUpdateTask): Promise<void>
  async batchUpdateComponents(tasks: ComponentUpdateTask[]): Promise<UpdateResult>
  async validateUpdatedDocumentation(componentNames: string[]): Promise<ValidationResult>
}

interface ComponentUpdateTask {
  componentName: string
  componentPath: string
  currentVersion: string
  documentedVersion: string
  updateType: 'major' | 'minor' | 'patch' | 'initial'
  priority: 'high' | 'medium' | 'low'
}
```

## Optimized File Watching

### Smart Change Detection

```typescript
// packages/mcp-server/src/utils/optimized-file-watcher.ts
class OptimizedFileWatcher {
  async onFileChange(filePath: string): Promise<void> {
    const newVersion = await this.extractVersion(filePath)
    const registryEntry = this.registry[newVersion.name]
    
    if (!registryEntry || this.isVersionDifferent(newVersion, registryEntry)) {
      await this.queueForUpdate(newVersion)
    }
  }
  
  private isVersionDifferent(current: ComponentVersion, registered: ComponentVersionEntry): boolean {
    return current.version !== registered.currentVersion || 
           current.contentHash !== registered.hash
  }
}
```

## Documentation Version Headers

Each generated documentation file includes version metadata:

```markdown
<!-- docs/components/forms/button.md -->
---
component: Button
component_version: 2.1.3
documentation_version: 2.1.3
last_updated: 2024-01-15T10:30:00Z
auto_generated: true
---

# Button Component

> **Version**: 2.1.3 | **Last Updated**: January 15, 2024
```

## CLI Commands

### Version Management Commands

```bash
# Check component versions vs documentation versions
pnpm docs:version-check

# Update specific components by name
pnpm docs:update button card input

# Update all outdated components
pnpm docs:update-outdated

# Show version status
pnpm docs:status

# Force update all components (rebuild everything)
pnpm docs:rebuild
```

### Example Output

```bash
$ pnpm docs:version-check
┌─────────────┬─────────────────┬─────────────────────┬────────────┐
│ Component   │ Current Version │ Documentation Version│ Status     │
├─────────────┼─────────────────┼─────────────────────┼────────────┤
│ Button      │ 2.1.3          │ 2.1.3              │ ✅ Up to date │
│ Input       │ 1.8.2          │ 1.8.1              │ ⚠️ Outdated   │
│ Card        │ 3.0.0          │ 2.9.1              │ 🔥 Major update│
│ NewComponent│ 1.0.0          │ -                   │ 📝 Missing    │
└─────────────┴─────────────────┴─────────────────────┴────────────┘

Found 3 components needing documentation updates.
Run 'pnpm docs:update-outdated' to update them.
```

## Performance Optimizations

### Registry Caching Strategy

```typescript
// packages/mcp-server/src/utils/version-cache.ts
class VersionRegistryCache {
  private cache: Map<string, ComponentVersionEntry> = new Map()
  private lastUpdateTime: Date = new Date()
  
  // Only load changed components from disk
  async syncWithFileSystem(): Promise<string[]> {
    const changedFiles = await this.getChangedFilesSinceLastUpdate()
    const updatedComponents: string[] = []
    
    for (const filePath of changedFiles) {
      const version = await this.extractVersion(filePath)
      const cacheEntry = this.cache.get(version.name)
      
      if (!cacheEntry || this.isNewer(version, cacheEntry)) {
        this.cache.set(version.name, {
          currentVersion: version.version,
          lastModified: version.lastModified,
          filePath: version.filePath,
          hash: version.contentHash,
          documentationVersion: cacheEntry?.documentationVersion || '',
          lastDocumentationUpdate: cacheEntry?.lastDocumentationUpdate || ''
        })
        updatedComponents.push(version.name)
      }
    }
    
    return updatedComponents
  }
}
```

## CI/CD Integration

### Incremental Update Pipeline

```yaml
# .github/workflows/documentation-incremental.yml
name: Incremental Documentation Update
on:
  push:
    paths:
      - 'packages/ui-kit/components/**/*.tsx'

jobs:
  incremental-update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
      - name: Install dependencies
        run: pnpm install
      - name: Check component versions
        id: version-check
        run: |
          OUTDATED=$(pnpm docs:version-check --json)
          echo "outdated=$OUTDATED" >> $GITHUB_OUTPUT
      - name: Update outdated documentation
        if: steps.version-check.outputs.outdated != '[]'
        run: pnpm docs:update-outdated
      - name: Validate updated documentation
        run: pnpm docs:validate --changed-only
      - name: Update MCP server cache
        run: pnpm mcp:refresh --incremental
```

## Benefits

- **Performance**: Only processes changed components, dramatically reducing build times
- **Accuracy**: Version tracking ensures documentation stays synchronized with code
- **Reliability**: Content hashing provides additional verification beyond version numbers
- **Scalability**: System performance remains constant as component library grows
- **Transparency**: Clear visibility into which components need documentation updates