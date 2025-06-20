# Technical Implementation Details

## Architecture Overview

The documentation system consists of several interconnected modules that work together to provide automated, version-aware documentation generation and AI-powered component discovery.

## Core System Components

### File Watcher Configuration

```typescript
// packages/mcp-server/src/utils/file-watcher.ts
interface WatchConfig {
  patterns: string[]
  ignored: string[]
  debounceMs: number
  handlers: {
    componentAdded: (filePath: string) => Promise<void>
    componentModified: (filePath: string) => Promise<void>
    componentDeleted: (filePath: string) => Promise<void>
    exampleAdded: (filePath: string) => Promise<void>
    exampleModified: (filePath: string) => Promise<void>
  }
}

const watchConfig: WatchConfig = {
  patterns: [
    'packages/ui-kit/components/ui/*.tsx',
    'packages/ui-kit/components/custom/*.tsx',
    'packages/ui-kit/hooks/*.ts',
    'packages/ui-kit/lib/*.ts',
    'packages/ui-kit/index.ts',
    'packages/playground/src/samples/*.tsx'
  ],
  ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
  debounceMs: 1000,
  handlers: {
    componentAdded: handleNewComponent,
    componentModified: handleComponentModification,
    componentDeleted: handleComponentDeletion,
    exampleAdded: handleNewExample,
    exampleModified: handleExampleModification
  }
}
```

### Component Metadata Extraction

```typescript
// packages/mcp-server/src/extractors/component-extractor.ts
interface ComponentMetadata {
  name: string
  filePath: string
  version: string
  lastModified: Date
  contentHash: string
  props: PropDefinition[]
  variants: VariantDefinition[]
  dependencies: string[]
  examples: ExampleReference[]
  category: ComponentCategory
  description: string
  exports: ExportDefinition[]
}

interface PropDefinition {
  name: string
  type: string
  required: boolean
  defaultValue?: string
  description?: string
  deprecated?: boolean
  examples?: any[]
}

interface VariantDefinition {
  name: string
  type: 'enum' | 'boolean' | 'string'
  values: string[]
  defaultValue?: string
  description?: string
}

interface ExampleReference {
  name: string
  filePath: string
  description: string
  complexity: 'basic' | 'intermediate' | 'advanced'
  tags: string[]
}

class ComponentExtractor {
  private tsProgram: ts.Program
  private checker: ts.TypeChecker

  async extractMetadata(filePath: string): Promise<ComponentMetadata> {
    const sourceFile = this.tsProgram.getSourceFile(filePath)
    if (!sourceFile) throw new Error(`Source file not found: ${filePath}`)

    const componentInfo = this.findComponentExports(sourceFile)
    const props = await this.extractProps(componentInfo.node)
    const variants = await this.extractVariants(componentInfo.node)
    const dependencies = await this.extractDependencies(sourceFile)
    const version = await this.extractVersion(sourceFile)
    
    return {
      name: componentInfo.name,
      filePath,
      version,
      lastModified: new Date(),
      contentHash: this.calculateHash(sourceFile.getFullText()),
      props,
      variants,
      dependencies,
      examples: [],
      category: this.inferCategory(componentInfo.name),
      description: this.extractDescription(componentInfo.node),
      exports: this.extractExports(sourceFile)
    }
  }

  private extractProps(node: ts.Node): PropDefinition[] {
    // Implementation for extracting props from TypeScript AST
    const propsInterface = this.findPropsInterface(node)
    if (!propsInterface) return []

    return propsInterface.members.map(member => {
      const type = this.checker.getTypeAtLocation(member)
      const symbol = this.checker.getSymbolAtLocation(member.name)
      
      return {
        name: symbol?.name || '',
        type: this.checker.typeToString(type),
        required: !member.questionToken,
        defaultValue: this.extractDefaultValue(member),
        description: this.extractJSDocComment(symbol),
        deprecated: this.hasDeprecatedTag(symbol),
        examples: this.extractExamples(symbol)
      }
    })
  }

  private extractVariants(node: ts.Node): VariantDefinition[] {
    // Extract variant types from cva() calls or variant props
    const cvaCall = this.findCvaCall(node)
    if (!cvaCall) return []

    return this.extractVariantsFromCva(cvaCall)
  }

  async detectChanges(current: ComponentMetadata, previous: ComponentMetadata): Promise<ChangeReport> {
    const changes: ChangeReport = {
      type: this.compareVersions(current.version, previous.version),
      component: current.name,
      breaking: false,
      changes: {
        props: {
          added: [],
          modified: [],
          removed: []
        },
        variants: {
          added: [],
          modified: [],
          removed: []
        }
      },
      migrationRequired: false
    }

    // Compare props
    const propChanges = this.compareProps(current.props, previous.props)
    changes.changes.props = propChanges
    changes.breaking = propChanges.removed.length > 0 || 
                      propChanges.modified.some(change => change.breaking)

    // Compare variants
    const variantChanges = this.compareVariants(current.variants, previous.variants)
    changes.changes.variants = variantChanges
    changes.breaking = changes.breaking || 
                      variantChanges.removed.length > 0

    changes.migrationRequired = changes.breaking
    return changes
  }
}
```

### Documentation Template Generation

```typescript
// packages/mcp-server/src/generators/doc-generator.ts
interface DocumentationTemplate {
  frontmatter: {
    component: string
    component_version: string
    documentation_version: string
    last_updated: string
    auto_generated: boolean
    category: string
    tags: string[]
  }
  sections: {
    header: ComponentHeader
    overview: ComponentOverview
    installation: InstallationGuide
    api: APIReference
    examples: CodeExample[]
    patterns: UsagePattern[]
    accessibility: AccessibilityGuide
    migration?: MigrationNotes
    related: RelatedComponent[]
  }
}

interface ComponentHeader {
  title: string
  description: string
  version: string
  lastUpdated: string
  badges: Badge[]
}

interface APIReference {
  props: PropDocumentation[]
  variants: VariantDocumentation[]
  methods?: MethodDocumentation[]
  events?: EventDocumentation[]
}

interface CodeExample {
  title: string
  description: string
  code: string
  language: 'tsx' | 'jsx' | 'typescript'
  complexity: 'basic' | 'intermediate' | 'advanced'
  tags: string[]
  interactive?: boolean
  playground?: string
}

class DocumentationGenerator {
  async generateFromTemplate(metadata: ComponentMetadata): Promise<string> {
    const template = await this.buildTemplate(metadata)
    return this.renderMarkdown(template)
  }

  private async buildTemplate(metadata: ComponentMetadata): Promise<DocumentationTemplate> {
    return {
      frontmatter: {
        component: metadata.name,
        component_version: metadata.version,
        documentation_version: metadata.version,
        last_updated: new Date().toISOString(),
        auto_generated: true,
        category: metadata.category,
        tags: this.generateTags(metadata)
      },
      sections: {
        header: this.generateHeader(metadata),
        overview: await this.generateOverview(metadata),
        installation: this.generateInstallation(metadata),
        api: this.generateAPIReference(metadata),
        examples: await this.generateExamples(metadata),
        patterns: await this.generatePatterns(metadata),
        accessibility: this.generateAccessibilityGuide(metadata),
        migration: await this.generateMigrationNotes(metadata),
        related: this.findRelatedComponents(metadata)
      }
    }
  }

  private renderMarkdown(template: DocumentationTemplate): string {
    const { frontmatter, sections } = template
    
    let markdown = '---\n'
    markdown += yaml.stringify(frontmatter)
    markdown += '---\n\n'
    
    // Header
    markdown += `# ${sections.header.title}\n\n`
    markdown += `> **Version**: ${sections.header.version} | **Last Updated**: ${format(new Date(sections.header.lastUpdated), 'MMMM d, yyyy')}\n\n`
    
    // Badges
    if (sections.header.badges.length > 0) {
      markdown += sections.header.badges.map(badge => 
        `![${badge.label}](${badge.url})`
      ).join(' ') + '\n\n'
    }
    
    // Overview
    markdown += `## Overview\n\n${sections.overview.description}\n\n`
    
    // Installation
    markdown += `## Installation\n\n`
    markdown += `\`\`\`bash\n${sections.installation.command}\n\`\`\`\n\n`
    markdown += `\`\`\`tsx\n${sections.installation.import}\n\`\`\`\n\n`
    
    // API Reference
    markdown += this.renderAPIReference(sections.api)
    
    // Examples
    markdown += this.renderExamples(sections.examples)
    
    // Patterns
    if (sections.patterns.length > 0) {
      markdown += this.renderPatterns(sections.patterns)
    }
    
    // Accessibility
    markdown += this.renderAccessibilityGuide(sections.accessibility)
    
    // Migration
    if (sections.migration) {
      markdown += this.renderMigrationNotes(sections.migration)
    }
    
    // Related Components
    if (sections.related.length > 0) {
      markdown += this.renderRelatedComponents(sections.related)
    }
    
    return markdown
  }

  async updateExistingDocumentation(docPath: string, changes: ChangeReport): Promise<void> {
    const existingContent = await fs.readFile(docPath, 'utf-8')
    const { frontmatter, content } = this.parseFrontmatter(existingContent)
    
    // Update frontmatter
    frontmatter.component_version = changes.newVersion
    frontmatter.documentation_version = changes.newVersion
    frontmatter.last_updated = new Date().toISOString()
    
    // Update specific sections based on changes
    const updatedContent = await this.updateContentSections(content, changes)
    
    // Reconstruct document
    const newDocument = this.reconstructDocument(frontmatter, updatedContent)
    await fs.writeFile(docPath, newDocument)
  }

  async validateDocumentation(docPath: string): Promise<ValidationResult> {
    const content = await fs.readFile(docPath, 'utf-8')
    const validation: ValidationResult = {
      valid: true,
      errors: [],
      warnings: [],
      suggestions: []
    }
    
    // Validate frontmatter
    const frontmatterValidation = this.validateFrontmatter(content)
    validation.errors.push(...frontmatterValidation.errors)
    validation.warnings.push(...frontmatterValidation.warnings)
    
    // Validate code examples
    const exampleValidation = await this.validateCodeExamples(content)
    validation.errors.push(...exampleValidation.errors)
    validation.warnings.push(...exampleValidation.warnings)
    
    // Validate links
    const linkValidation = await this.validateLinks(content)
    validation.errors.push(...linkValidation.errors)
    
    // Validate accessibility information
    const a11yValidation = this.validateAccessibilityContent(content)
    validation.warnings.push(...a11yValidation.warnings)
    validation.suggestions.push(...a11yValidation.suggestions)
    
    validation.valid = validation.errors.length === 0
    return validation
  }
}
```

### Change Detection and Notification

```typescript
// packages/mcp-server/src/services/change-detector.ts
interface ChangeReport {
  type: 'added' | 'modified' | 'deleted'
  component: string
  oldVersion?: string
  newVersion: string
  breaking: boolean
  changes: {
    props: {
      added: PropDefinition[]
      modified: PropChangeDetail[]
      removed: PropDefinition[]
    }
    variants: {
      added: VariantDefinition[]
      modified: VariantChangeDetail[]
      removed: VariantDefinition[]
    }
    dependencies: {
      added: string[]
      removed: string[]
    }
  }
  migrationRequired: boolean
  impact: ChangeImpact
}

interface PropChangeDetail {
  prop: PropDefinition
  changes: {
    type?: { old: string; new: string }
    required?: { old: boolean; new: boolean }
    defaultValue?: { old: string; new: string }
  }
  breaking: boolean
}

interface ChangeImpact {
  severity: 'low' | 'medium' | 'high' | 'critical'
  affectedComponents: string[]
  estimatedMigrationEffort: 'minimal' | 'moderate' | 'significant' | 'major'
  automatedMigration: boolean
}

class ChangeDetector {
  async detectChanges(oldMeta: ComponentMetadata, newMeta: ComponentMetadata): Promise<ChangeReport> {
    const report: ChangeReport = {
      type: 'modified',
      component: newMeta.name,
      oldVersion: oldMeta.version,
      newVersion: newMeta.version,
      breaking: false,
      changes: {
        props: this.compareProps(oldMeta.props, newMeta.props),
        variants: this.compareVariants(oldMeta.variants, newMeta.variants),
        dependencies: this.compareDependencies(oldMeta.dependencies, newMeta.dependencies)
      },
      migrationRequired: false,
      impact: {
        severity: 'low',
        affectedComponents: [],
        estimatedMigrationEffort: 'minimal',
        automatedMigration: true
      }
    }

    // Analyze breaking changes
    report.breaking = this.isBreakingChange(report.changes)
    report.migrationRequired = report.breaking

    // Calculate impact
    report.impact = await this.calculateImpact(report)

    return report
  }

  private compareProps(oldProps: PropDefinition[], newProps: PropDefinition[]) {
    const oldPropsMap = new Map(oldProps.map(p => [p.name, p]))
    const newPropsMap = new Map(newProps.map(p => [p.name, p]))
    
    const added: PropDefinition[] = []
    const modified: PropChangeDetail[] = []
    const removed: PropDefinition[] = []
    
    // Find added and modified props
    for (const [name, newProp] of newPropsMap) {
      const oldProp = oldPropsMap.get(name)
      if (!oldProp) {
        added.push(newProp)
      } else {
        const changes = this.comparePropsDetail(oldProp, newProp)
        if (Object.keys(changes.changes).length > 0) {
          modified.push(changes)
        }
      }
    }
    
    // Find removed props
    for (const [name, oldProp] of oldPropsMap) {
      if (!newPropsMap.has(name)) {
        removed.push(oldProp)
      }
    }
    
    return { added, modified, removed }
  }

  private comparePropsDetail(oldProp: PropDefinition, newProp: PropDefinition): PropChangeDetail {
    const changes: any = {}
    
    if (oldProp.type !== newProp.type) {
      changes.type = { old: oldProp.type, new: newProp.type }
    }
    
    if (oldProp.required !== newProp.required) {
      changes.required = { old: oldProp.required, new: newProp.required }
    }
    
    if (oldProp.defaultValue !== newProp.defaultValue) {
      changes.defaultValue = { old: oldProp.defaultValue, new: newProp.defaultValue }
    }
    
    const breaking = (changes.type && !this.isTypeCompatible(oldProp.type, newProp.type)) ||
                    (changes.required && newProp.required && !oldProp.required)
    
    return {
      prop: newProp,
      changes,
      breaking
    }
  }

  private async calculateImpact(report: ChangeReport): Promise<ChangeImpact> {
    const affectedComponents = await this.findAffectedComponents(report.component)
    
    let severity: ChangeImpact['severity'] = 'low'
    let migrationEffort: ChangeImpact['estimatedMigrationEffort'] = 'minimal'
    
    if (report.breaking) {
      severity = affectedComponents.length > 10 ? 'critical' : 'high'
      migrationEffort = this.estimateMigrationEffort(report.changes)
    } else if (report.changes.props.added.length > 0) {
      severity = 'medium'
    }
    
    return {
      severity,
      affectedComponents,
      estimatedMigrationEffort: migrationEffort,
      automatedMigration: this.canAutomate(report.changes)
    }
  }

  async notifyStakeholders(report: ChangeReport): Promise<void> {
    const notifications = this.buildNotifications(report)
    
    for (const notification of notifications) {
      switch (notification.channel) {
        case 'slack':
          await this.slackNotifier.send(notification)
          break
        case 'email':
          await this.emailNotifier.send(notification)
          break
        case 'github':
          await this.githubNotifier.createIssue(notification)
          break
      }
    }
  }

  async updateMigrationGuide(report: ChangeReport): Promise<void> {
    if (!report.migrationRequired) return
    
    const migrationPath = `docs/migration/${report.component}-${report.newVersion}.md`
    const migrationContent = await this.generateMigrationGuide(report)
    
    await fs.writeFile(migrationPath, migrationContent)
    
    // Update main migration index
    await this.updateMigrationIndex(report)
  }
}
```

This technical implementation provides the foundation for a robust, automated documentation system that can handle complex component libraries while maintaining high performance and accuracy.