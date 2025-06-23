/**
 * Component Metadata Schema
 * 
 * Defines the structure for component metadata extracted from TypeScript files
 */

export interface ComponentMetadata {
  /** Component name */
  name: string
  /** Display name for documentation */
  displayName: string
  /** Path to the component file */
  filePath: string
  /** Component version */
  version: string
  /** Last modification timestamp */
  lastModified: Date
  /** File content hash */
  contentHash: string
  /** Component category */
  category: ComponentCategory
  /** Component description */
  description: string
  /** Tags for categorization */
  tags: string[]
  /** Component status */
  status: ComponentStatus
  /** Exported items */
  exports: ExportDefinition[]
  /** Component props */
  props: PropDefinition[]
  /** Component variants */
  variants: VariantDefinition[]
  /** Dependencies */
  dependencies: ComponentDependency[]
  /** Usage examples */
  examples: ExampleReference[]
  /** Design patterns */
  patterns: PatternReference[]
  /** Accessibility information */
  accessibility: AccessibilityInfo
  /** Performance information */
  performance: PerformanceInfo
  /** Testing information */
  testing: TestingInfo
}

export type ComponentCategory = 
  | 'forms'
  | 'layout' 
  | 'navigation'
  | 'feedback'
  | 'data-display'
  | 'utility'
  | 'custom'

export type ComponentStatus = 
  | 'stable'
  | 'beta'
  | 'alpha'
  | 'deprecated'
  | 'experimental'

export interface ExportDefinition {
  name: string
  type: 'component' | 'hook' | 'utility' | 'type' | 'constant'
  signature: string
  isDefault: boolean
  description?: string
  since?: string
  deprecated?: DeprecationInfo
}

export interface ComponentDependency {
  name: string
  type: 'internal' | 'external' | 'peer'
  version?: string
  optional: boolean
  description?: string
}

export interface PropDefinition {
  name: string
  type: PropType
  required: boolean
  defaultValue?: any
  description?: string
  since?: string
  deprecated?: DeprecationInfo
  examples?: PropExample[]
  validation?: ValidationRule[]
  accessibility?: AccessibilityProp
}

export interface PropType {
  name: string
  raw: string
  signature?: string
  elements?: PropType[]
  properties?: Record<string, PropType>
  parameters?: PropType[]
  returnType?: PropType
  union?: PropType[]
  intersection?: PropType[]
  generic?: {
    name: string
    constraint?: PropType
    default?: PropType
  }[]
}

export interface PropExample {
  value: any
  description?: string
  valid: boolean
  code?: string
}

export interface ValidationRule {
  type: 'required' | 'pattern' | 'range' | 'custom'
  message: string
  parameters?: Record<string, any>
}

export interface AccessibilityProp {
  required: boolean
  description: string
  examples: string[]
  relatedProps?: string[]
}

export interface DeprecationInfo {
  since: string
  alternative?: string
  reason?: string
  removalVersion?: string
}

export interface VariantDefinition {
  name: string
  type: VariantType
  values: VariantValue[]
  defaultValue?: string
  description?: string
  examples?: VariantExample[]
  combinations?: VariantCombination[]
}

export type VariantType = 
  | 'enum'
  | 'boolean'
  | 'compound'

export interface VariantValue {
  name: string
  description?: string
  className?: string
  styles?: Record<string, string>
  preview?: string
  compatibility?: string[]
  since?: string
  deprecated?: DeprecationInfo
}

export interface VariantExample {
  variant: Record<string, string>
  description: string
  code: string
  preview?: string
}

export interface VariantCombination {
  variants: Record<string, string>
  description: string
  recommended: boolean
  conflicts?: string[]
  note?: string
}

export interface ExampleReference {
  name: string
  filePath: string
  description: string
  complexity: 'basic' | 'intermediate' | 'advanced'
  tags: string[]
}

export interface PatternReference {
  name: string
  description: string
  filePath: string
  category: string
}

export interface AccessibilityInfo {
  wcagLevel: 'A' | 'AA' | 'AAA'
  features: string[]
  requirements: string[]
  testing: string[]
}

export interface PerformanceInfo {
  bundleSize: number
  renderComplexity: 'low' | 'medium' | 'high'
  optimizations: string[]
  considerations: string[]
}

export interface TestingInfo {
  testCoverage: number
  testTypes: string[]
  recommendations: string[]
}