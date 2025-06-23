/**
 * Documentation Generator
 * 
 * Main service for generating component documentation
 */

import { writeFile, mkdir } from 'fs/promises'
import { dirname, join, resolve, basename } from 'path'
import { extractComponentVersion } from '../extractors/version-extractor.js'
import { extractComponentProps, extractComponentVariants } from '../extractors/prop-extractor.js'
import { VersionRegistryService } from '../services/version-registry.js'
import { TemplateRenderer, createPropTable, createVariantTable, generateBasicExample } from './template-renderer.js'
import { getComponentCategory, getRelativePath } from '../utils/file-utils.js'
import type { ComponentDocumentation, DocumentationExample, RelatedComponent } from '../schemas/documentation.js'

export class DocumentationGenerator {
  private renderer: TemplateRenderer
  private registryService: VersionRegistryService
  private projectRoot: string
  private outputDir: string

  constructor(projectRoot: string, outputDir: string = 'docs/components') {
    this.projectRoot = projectRoot
    this.outputDir = resolve(projectRoot, outputDir)
    this.renderer = new TemplateRenderer(resolve(projectRoot, 'packages/mcp-server/src/templates'))
    this.registryService = new VersionRegistryService(projectRoot)
  }

  /**
   * Initialize the documentation generator
   */
  async initialize(): Promise<void> {
    await this.registryService.initialize()
    await mkdir(this.outputDir, { recursive: true })
  }

  /**
   * Generate documentation for a single component
   */
  async generateComponentDocs(filePath: string): Promise<string | null> {
    try {
      // Extract component metadata
      const versionData = await extractComponentVersion(filePath)
      if (!versionData) {
        console.warn(`Could not extract version data from ${filePath}`)
        return null
      }

      // Extract props and variants
      const props = await extractComponentProps(filePath)
      const variants = await extractComponentVariants(filePath)

      // Get examples from playground
      const examples = await this.getComponentExamples(versionData.name)

      // Build documentation context
      const docData = await this.buildDocumentationData(versionData, props, variants, examples, filePath)

      // Render template
      const context = {
        component: docData,
        props,
        variants,
        examples
      }

      const rendered = await this.renderer.renderTemplate('component.md.template', context)

      // Write to output directory
      const outputPath = join(this.outputDir, `${versionData.name.toLowerCase()}.md`)
      await writeFile(outputPath, rendered, 'utf-8')

      // Mark documentation as updated in registry
      await this.registryService.markDocumentationUpdated(versionData.name, versionData.version)
      await this.registryService.save()

      console.log(`✅ Generated documentation for ${versionData.name} -> ${outputPath}`)
      return outputPath

    } catch (error) {
      console.error(`❌ Error generating docs for ${filePath}:`, error)
      return null
    }
  }

  /**
   * Generate documentation for all outdated components
   */
  async generateOutdatedDocs(): Promise<string[]> {
    const outdated = await this.registryService.getOutdatedComponents()
    const generated: string[] = []

    console.log(`📝 Generating documentation for ${outdated.length} outdated components...`)

    for (const component of outdated) {
      const entry = await this.registryService.getComponentEntry(component.componentName)
      if (entry?.filePath) {
        const outputPath = await this.generateComponentDocs(entry.filePath)
        if (outputPath) {
          generated.push(outputPath)
        }
      }
    }

    return generated
  }

  /**
   * Build documentation data from extracted information
   */
  private async buildDocumentationData(
    versionData: any,
    props: any[],
    variants: any[],
    examples: DocumentationExample[],
    filePath: string
  ): Promise<ComponentDocumentation> {
    const category = getComponentCategory(filePath)
    const primaryExport = this.getPrimaryExport(versionData.exports)
    const additionalExports = versionData.exports.filter((exp: string) => 
      exp !== primaryExport && !exp.startsWith('default(') && !exp.startsWith('type ')
    )

    return {
      // Frontmatter metadata
      componentName: versionData.name,
      description: this.generateDescription(versionData.name, category),
      version: versionData.version,
      lastModified: versionData.lastModified,
      status: versionData.status,
      category,
      tags: this.generateTags(versionData.name, category),
      exports: versionData.exports,
      dependencies: this.extractDependencies(versionData.exports),
      exampleCount: examples.length,

      // Import information
      primaryExport,
      additionalExports,

      // Basic usage
      basicExample: generateBasicExample(primaryExport, props),
      componentDescription: this.generateComponentDescription(versionData.name, category),

      // API Reference
      propTable: createPropTable(props),
      hasVariants: variants.length > 0,
      variantTable: variants.length > 0 ? createVariantTable(variants) : undefined,

      // Sub-components
      hasSubComponents: additionalExports.length > 0,
      subComponents: additionalExports.map((exp: string) => ({
        name: exp,
        description: this.generateSubComponentDescription(exp),
        propTable: '_Props inherited from main component._'
      })),

      // Examples
      examples,

      // Additional content
      accessibilityNotes: this.generateAccessibilityNotes(versionData.name),
      relatedComponents: this.getRelatedComponents(versionData.name, category),
      changelog: this.getChangelogEntries(versionData),

      // Generation metadata
      generatedDate: new Date().toISOString().split('T')[0],
      editUrl: this.generateEditUrl(filePath)
    }
  }

  /**
   * Get primary export from exports list
   */
  private getPrimaryExport(exports: string[]): string {
    // Look for the main component export (usually matches the component name)
    const mainExport = exports.find(exp => 
      !exp.startsWith('default(') && 
      !exp.startsWith('type ') && 
      !exp.includes('Props') &&
      !exp.includes('Variants') &&
      exp[0] === exp[0].toUpperCase()
    )
    
    return mainExport || exports[0] || 'Component'
  }

  /**
   * Generate component description
   */
  private generateDescription(name: string, category: string): string {
    const descriptions: Record<string, string> = {
      'Button': 'A customizable button component with multiple variants and sizes',
      'Input': 'A text input component with validation and styling options',
      'Card': 'A flexible container component with header, content, and footer sections',
      'Select': 'A dropdown selection component with search and multi-select options',
      'Form': 'Form components with built-in validation and field management',
      'Dialog': 'A modal dialog component for focused user interactions',
      'Alert': 'A feedback component for displaying important messages to users',
      'Badge': 'A small status indicator or label component',
      'Avatar': 'A user profile image component with fallback initials',
      'Checkbox': 'A binary choice input component for forms',
      'Switch': 'A toggle switch component for boolean options',
      'Slider': 'A range input component for selecting values',
      'Progress': 'A progress indicator component for showing completion status',
      'Skeleton': 'A placeholder component for loading states',
      'Separator': 'A visual divider component for separating content',
      'Table': 'A data table component with sorting and styling options',
      'Tabs': 'A tabbed interface component for organizing content',
      'Accordion': 'A collapsible content container with multiple panels',
      'Calendar': 'A date picker and calendar interface component',
      'Command': 'A command palette and search interface component',
      'ContextMenu': 'A right-click context menu component',
      'DropdownMenu': 'A dropdown menu component with multiple action items',
      'HoverCard': 'A floating card component that appears on hover',
      'NavigationMenu': 'A navigation menu component with nested items',
      'Popover': 'A floating content container component',
      'Sheet': 'A slide-out panel component for secondary content',
      'Tooltip': 'A floating tooltip component for additional information'
    }
    
    return descriptions[name] || `A ${category} component for the UI library`
  }

  /**
   * Generate component description for the API section
   */
  private generateComponentDescription(name: string, category: string): string {
    return `The ${name} component provides ${this.generateDescription(name, category).toLowerCase()}.`
  }

  /**
   * Generate tags for component
   */
  private generateTags(name: string, category: string): string[] {
    const tags = [category]
    
    const tagMapping: Record<string, string[]> = {
      'Button': ['interactive', 'action'],
      'Input': ['form', 'text'],
      'Select': ['form', 'dropdown'],
      'Checkbox': ['form', 'selection'],
      'Switch': ['form', 'toggle'],
      'Dialog': ['overlay', 'modal'],
      'Sheet': ['overlay', 'panel'],
      'Popover': ['overlay', 'floating'],
      'Tooltip': ['overlay', 'help'],
      'Card': ['layout', 'container'],
      'Alert': ['feedback', 'notification'],
      'Progress': ['feedback', 'status'],
      'Badge': ['display', 'status'],
      'Avatar': ['display', 'user'],
      'Table': ['data', 'display'],
      'Calendar': ['date', 'picker'],
      'Navigation': ['navigation', 'menu']
    }
    
    const specificTags = tagMapping[name] || []
    return [...new Set([...tags, ...specificTags])]
  }

  /**
   * Extract dependencies from exports
   */
  private extractDependencies(exports: string[]): string[] {
    // For now, return common dependencies
    // TODO: Parse actual imports from file
    return ['@radix-ui/react-*', 'class-variance-authority', 'tailwindcss']
  }

  /**
   * Generate sub-component description
   */
  private generateSubComponentDescription(name: string): string {
    const descriptions: Record<string, string> = {
      'Content': 'The main content area',
      'Header': 'The header section',
      'Footer': 'The footer section',
      'Title': 'The title element',
      'Description': 'The description text',
      'Trigger': 'The trigger element',
      'Item': 'An individual item',
      'Group': 'A grouping container',
      'Separator': 'A visual separator',
      'Label': 'A label element'
    }
    
    for (const [key, desc] of Object.entries(descriptions)) {
      if (name.includes(key)) {
        return desc
      }
    }
    
    return `${name} sub-component`
  }

  /**
   * Get component examples from playground
   */
  private async getComponentExamples(componentName: string): Promise<DocumentationExample[]> {
    // TODO: Implement example extraction from playground
    // For now, return a basic example
    return [
      {
        title: 'Basic Usage',
        description: `Basic usage of the ${componentName} component.`,
        code: generateBasicExample(componentName),
        hasPreview: true
      }
    ]
  }

  /**
   * Generate accessibility notes
   */
  private generateAccessibilityNotes(componentName: string): string {
    const notes: Record<string, string> = {
      'Button': 'Supports keyboard navigation and screen readers. Use descriptive text or aria-label for icon buttons.',
      'Input': 'Associates with labels for screen readers. Supports validation states and error messages.',
      'Dialog': 'Manages focus and provides escape key handling. Includes proper ARIA attributes.',
      'Select': 'Provides keyboard navigation and screen reader support for dropdown options.',
      'Checkbox': 'Supports keyboard interaction and provides clear checked/unchecked states.',
      'Switch': 'Accessible toggle with keyboard support and clear on/off states.',
      'Table': 'Includes proper table headers and cell associations for screen readers.',
      'Tabs': 'Supports arrow key navigation and maintains proper focus management.'
    }
    
    return notes[componentName] || 'Follow standard accessibility practices for this component type.'
  }

  /**
   * Get related components
   */
  private getRelatedComponents(componentName: string, category: string): RelatedComponent[] {
    const relations: Record<string, string[]> = {
      'Button': ['Input', 'Form', 'Dialog'],
      'Input': ['Button', 'Form', 'Label'],
      'Dialog': ['Button', 'Sheet', 'AlertDialog'],
      'Select': ['Input', 'Popover', 'Command'],
      'Card': ['Button', 'Badge', 'Separator'],
      'Form': ['Input', 'Button', 'Label', 'Checkbox'],
      'Table': ['Button', 'Select', 'Pagination'],
      'Navigation': ['Button', 'DropdownMenu', 'Sheet']
    }
    
    const related = relations[componentName] || []
    return related.map(name => ({
      name,
      slug: name.toLowerCase(),
      description: this.generateDescription(name, 'ui')
    }))
  }

  /**
   * Get changelog entries from version history
   */
  private getChangelogEntries(versionData: any): any[] {
    // Return recent history from registry
    return (versionData.history || []).slice(-5).map((entry: any) => ({
      version: entry.version,
      date: entry.date.split('T')[0],
      changes: entry.notes
    }))
  }

  /**
   * Generate edit URL for GitHub
   */
  private generateEditUrl(filePath: string): string {
    const relativePath = getRelativePath(filePath, this.projectRoot)
    return `https://github.com/your-org/your-repo/edit/main/${relativePath}`
  }
}

// DocumentationGenerator is already exported in the class declaration