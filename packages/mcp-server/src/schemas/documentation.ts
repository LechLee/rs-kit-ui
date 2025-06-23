/**
 * Documentation Generation Schemas
 * 
 * TypeScript interfaces for documentation template data
 */

export interface ComponentDocumentation {
  // Frontmatter metadata
  componentName: string
  description: string
  version: string
  lastModified: string
  status: 'stable' | 'beta' | 'alpha' | 'deprecated' | 'experimental'
  category: string
  tags: string[]
  exports: string[]
  dependencies: string[]
  exampleCount: number
  
  // Import information
  primaryExport: string
  additionalExports: string[]
  
  // Basic usage
  basicExample: string
  componentDescription: string
  
  // API Reference
  propTable: string
  hasVariants: boolean
  variantTable?: string
  
  // Sub-components
  hasSubComponents: boolean
  subComponents: SubComponent[]
  
  // Examples
  examples: DocumentationExample[]
  
  // Additional content
  accessibilityNotes: string
  relatedComponents: RelatedComponent[]
  changelog: ChangelogEntry[]
  
  // Generation metadata
  generatedDate: string
  editUrl: string
}

export interface SubComponent {
  name: string
  description: string
  propTable: string
}

export interface DocumentationExample {
  title: string
  description: string
  code: string
  hasPreview: boolean
}

export interface RelatedComponent {
  name: string
  slug: string
  description: string
}

export interface ChangelogEntry {
  version: string
  date: string
  changes: string
}

export interface ComponentProp {
  name: string
  type: string
  description: string
  required: boolean
  defaultValue?: string
}

export interface ComponentVariant {
  name: string
  type: string
  options: VariantOption[]
  defaultValue?: string
}

export interface VariantOption {
  value: string
  description: string
}

export interface TemplateContext {
  // Template rendering context
  component: ComponentDocumentation
  props: ComponentProp[]
  variants: ComponentVariant[]
  examples: DocumentationExample[]
}

export interface DocumentationConfig {
  // Configuration for documentation generation
  templatesDir: string
  outputDir: string
  examplesDir: string
  baseUrl: string
  editBaseUrl: string
  categories: string[]
  defaultTags: string[]
}