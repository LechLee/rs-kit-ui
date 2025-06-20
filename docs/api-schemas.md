# API Schemas and TypeScript Interfaces

## Overview

This document defines all TypeScript interfaces, schemas, and type definitions used throughout the documentation system, providing a comprehensive reference for developers and ensuring type safety across all components.

## Core Component Schemas

### Component Metadata

```typescript
// packages/mcp-server/src/schemas/component.ts

interface ComponentMetadata {
  name: string
  displayName: string
  filePath: string
  version: string
  lastModified: Date
  contentHash: string
  category: ComponentCategory
  description: string
  tags: string[]
  status: ComponentStatus
  exports: ExportDefinition[]
  props: PropDefinition[]
  variants: VariantDefinition[]
  dependencies: ComponentDependency[]
  examples: ExampleReference[]
  patterns: PatternReference[]
  accessibility: AccessibilityInfo
  performance: PerformanceInfo
  testing: TestingInfo
}

type ComponentCategory = 
  | 'forms'
  | 'layout' 
  | 'navigation'
  | 'feedback'
  | 'data-display'
  | 'utility'
  | 'custom'

type ComponentStatus = 
  | 'stable'
  | 'beta'
  | 'alpha'
  | 'deprecated'
  | 'experimental'

interface ExportDefinition {
  name: string
  type: 'component' | 'hook' | 'utility' | 'type' | 'constant'
  signature: string
  isDefault: boolean
  description?: string
  since?: string
  deprecated?: {
    since: string
    alternative?: string
    reason?: string
  }
}

interface ComponentDependency {
  name: string
  type: 'internal' | 'external' | 'peer'
  version?: string
  optional: boolean
  description?: string
}
```

### Property Definitions

```typescript
// packages/mcp-server/src/schemas/prop.ts

interface PropDefinition {
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

interface PropType {
  name: string
  raw: string
  signature?: string
  elements?: PropType[]  // For arrays and tuples
  properties?: Record<string, PropType>  // For objects
  parameters?: PropType[]  // For functions
  returnType?: PropType  // For functions
  union?: PropType[]  // For union types
  intersection?: PropType[]  // For intersection types
  generic?: {
    name: string
    constraint?: PropType
    default?: PropType
  }[]
}

interface PropExample {
  value: any
  description?: string
  valid: boolean
  code?: string
}

interface ValidationRule {
  type: 'required' | 'pattern' | 'range' | 'custom'
  message: string
  parameters?: Record<string, any>
}

interface AccessibilityProp {
  required: boolean
  description: string
  examples: string[]
  relatedProps?: string[]
}

interface DeprecationInfo {
  since: string
  alternative?: string
  reason?: string
  removalVersion?: string
}
```

### Variant Definitions

```typescript
// packages/mcp-server/src/schemas/variant.ts

interface VariantDefinition {
  name: string
  type: VariantType
  values: VariantValue[]
  defaultValue?: string
  description?: string
  examples?: VariantExample[]
  combinations?: VariantCombination[]
}

type VariantType = 
  | 'enum'
  | 'boolean'
  | 'compound'

interface VariantValue {
  name: string
  description?: string
  className?: string
  styles?: Record<string, string>
  preview?: string
  compatibility?: string[]
  since?: string
  deprecated?: DeprecationInfo
}

interface VariantExample {
  variant: Record<string, string>
  description: string
  code: string
  preview?: string
}

interface VariantCombination {
  variants: Record<string, string>
  description: string
  recommended: boolean
  conflicts?: string[]
  note?: string
}
```

## Documentation Schemas

### Documentation Structure

```typescript
// packages/mcp-server/src/schemas/documentation.ts

interface DocumentationStructure {
  frontmatter: DocumentationFrontmatter
  sections: DocumentationSection[]
  metadata: DocumentationMetadata
}

interface DocumentationFrontmatter {
  component: string
  component_version: string
  documentation_version: string
  last_updated: string
  auto_generated: boolean
  category: ComponentCategory
  tags: string[]
  status: ComponentStatus
  reviewed_by?: string
  review_date?: string
}

interface DocumentationSection {
  id: string
  title: string
  type: SectionType
  content: SectionContent
  order: number
  required: boolean
  dependencies?: string[]
}

type SectionType = 
  | 'overview'
  | 'installation'
  | 'api-reference'
  | 'examples'
  | 'patterns'
  | 'accessibility'
  | 'performance'
  | 'testing'
  | 'migration'
  | 'related'

interface SectionContent {
  markdown?: string
  examples?: CodeExample[]
  table?: TableData
  list?: ListData
  media?: MediaData
  interactive?: InteractiveData
}

interface DocumentationMetadata {
  wordCount: number
  readingTime: number
  exampleCount: number
  lastValidated: Date
  qualityScore: number
  completenessScore: number
}
```

### Code Examples

```typescript
// packages/mcp-server/src/schemas/example.ts

interface CodeExample {
  id: string
  title: string
  description: string
  code: string
  language: ProgrammingLanguage
  complexity: ComplexityLevel
  category: ExampleCategory
  tags: string[]
  dependencies?: string[]
  setup?: SetupInstruction[]
  validation: ExampleValidation
  interactive?: InteractiveExample
  variations?: CodeVariation[]
}

type ProgrammingLanguage = 
  | 'tsx'
  | 'jsx'
  | 'typescript'
  | 'javascript'
  | 'css'
  | 'html'
  | 'bash'
  | 'json'

type ComplexityLevel = 
  | 'basic'
  | 'intermediate'
  | 'advanced'
  | 'expert'

type ExampleCategory = 
  | 'basic-usage'
  | 'styling'
  | 'forms'
  | 'state-management'
  | 'composition'
  | 'patterns'
  | 'accessibility'
  | 'testing'
  | 'performance'

interface SetupInstruction {
  step: number
  description: string
  code?: string
  file?: string
}

interface ExampleValidation {
  compiles: boolean
  runs: boolean
  accessible: boolean
  performance: PerformanceScore
  lastChecked: Date
  errors?: ValidationError[]
  warnings?: ValidationWarning[]
}

interface InteractiveExample {
  playgroundUrl?: string
  stackblitzUrl?: string
  codesandboxUrl?: string
  preview?: PreviewData
}

interface CodeVariation {
  name: string
  description: string
  code: string
  changes: CodeChange[]
}

interface CodeChange {
  type: 'addition' | 'removal' | 'modification'
  line: number
  content: string
  reason: string
}
```

### Usage Patterns

```typescript
// packages/mcp-server/src/schemas/pattern.ts

interface UsagePattern {
  id: string
  name: string
  description: string
  category: PatternCategory
  components: string[]
  difficulty: ComplexityLevel
  useCase: string
  benefits: string[]
  tradeoffs?: string[]
  implementation: PatternImplementation
  examples: CodeExample[]
  variations?: PatternVariation[]
  related?: string[]
}

type PatternCategory = 
  | 'composition'
  | 'layout'
  | 'forms'
  | 'navigation'
  | 'data-display'
  | 'interaction'
  | 'responsive'
  | 'accessibility'
  | 'performance'

interface PatternImplementation {
  steps: ImplementationStep[]
  considerations: string[]
  bestPractices: string[]
  commonMistakes: string[]
}

interface ImplementationStep {
  order: number
  title: string
  description: string
  code?: string
  file?: string
  dependencies?: string[]
}

interface PatternVariation {
  name: string
  description: string
  when: string
  changes: CodeChange[]
  example: CodeExample
}
```

## Version Tracking Schemas

### Version Registry

```typescript
// packages/mcp-server/src/schemas/version-registry.ts

interface ComponentVersionRegistry {
  [componentName: string]: ComponentVersionEntry
}

interface ComponentVersionEntry {
  currentVersion: string
  lastModified: string
  filePath: string
  documentationVersion: string
  lastDocumentationUpdate: string
  hash: string
  size: number
  exports: string[]
  status: ComponentStatus
  history: VersionHistoryEntry[]
}

interface VersionHistoryEntry {
  version: string
  date: string
  changes: ChangeType[]
  breaking: boolean
  migrationRequired: boolean
  notes?: string
}

type ChangeType = 
  | 'major'
  | 'minor'
  | 'patch'
  | 'prerelease'

interface VersionComparisonResult {
  componentName: string
  needsUpdate: boolean
  versionDiff: {
    current: string
    documented: string
    type: ChangeType
  }
  reason: ComparisonReason
  priority: UpdatePriority
  estimatedEffort: EffortEstimate
}

type ComparisonReason = 
  | 'version_mismatch'
  | 'hash_mismatch'
  | 'missing_docs'
  | 'stale_docs'
  | 'up_to_date'

type UpdatePriority = 
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'

type EffortEstimate = 
  | 'minimal'
  | 'moderate'
  | 'significant'
  | 'major'
```

### Change Detection

```typescript
// packages/mcp-server/src/schemas/change-detection.ts

interface ChangeReport {
  id: string
  timestamp: Date
  type: ChangeType
  component: string
  oldVersion?: string
  newVersion: string
  breaking: boolean
  changes: ComponentChanges
  impact: ChangeImpact
  migrationRequired: boolean
  automatedMigration: boolean
}

interface ComponentChanges {
  props: PropChanges
  variants: VariantChanges
  exports: ExportChanges
  dependencies: DependencyChanges
  files: FileChanges
}

interface PropChanges {
  added: PropDefinition[]
  modified: PropChangeDetail[]
  removed: PropDefinition[]
  renamed: PropRename[]
}

interface PropChangeDetail {
  prop: PropDefinition
  changes: {
    type?: TypeChange
    required?: RequiredChange
    defaultValue?: DefaultValueChange
    description?: DescriptionChange
  }
  breaking: boolean
  migrationPath?: string
}

interface TypeChange {
  old: PropType
  new: PropType
  compatible: boolean
  reason: string
}

interface RequiredChange {
  old: boolean
  new: boolean
  reason: string
}

interface VariantChanges {
  added: VariantDefinition[]
  modified: VariantChangeDetail[]
  removed: VariantDefinition[]
  values: {
    added: VariantValue[]
    modified: VariantValue[]
    removed: VariantValue[]
  }
}

interface ExportChanges {
  added: ExportDefinition[]
  modified: ExportDefinition[]
  removed: ExportDefinition[]
  renamed: ExportRename[]
}

interface DependencyChanges {
  added: ComponentDependency[]
  removed: ComponentDependency[]
  updated: DependencyUpdate[]
}

interface FileChanges {
  created: string[]
  modified: string[]
  deleted: string[]
  moved: FileMove[]
}

interface ChangeImpact {
  severity: 'low' | 'medium' | 'high' | 'critical'
  affectedComponents: string[]
  affectedPatterns: string[]
  affectedExamples: string[]
  estimatedMigrationEffort: EffortEstimate
  userFacingChanges: boolean
  apiChanges: boolean
  visualChanges: boolean
}
```

## MCP Server Schemas

### MCP Protocol Interfaces

```typescript
// packages/mcp-server/src/schemas/mcp.ts

interface MCPResource {
  uri: string
  name: string
  description?: string
  mimeType?: string
}

interface MCPTool {
  name: string
  description: string
  inputSchema: JsonSchema
}

interface MCPPrompt {
  name: string
  description: string
  arguments?: MCPPromptArgument[]
}

interface MCPPromptArgument {
  name: string
  description: string
  required: boolean
}

interface ComponentSearchRequest {
  query?: string
  category?: ComponentCategory
  tags?: string[]
  complexity?: ComplexityLevel
  status?: ComponentStatus
  limit?: number
  offset?: number
  filters?: SearchFilter[]
}

interface SearchFilter {
  field: string
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'in' | 'range'
  value: any
}

interface ComponentSearchResponse {
  results: ComponentSearchResult[]
  total: number
  facets?: SearchFacet[]
  suggestions?: string[]
}

interface ComponentSearchResult {
  component: ComponentMetadata
  score: number
  highlights?: SearchHighlight[]
  reason?: string
}

interface SearchHighlight {
  field: string
  matches: string[]
}

interface SearchFacet {
  field: string
  values: FacetValue[]
}

interface FacetValue {
  value: string
  count: number
}

interface CodeGenerationRequest {
  component: string
  props?: Record<string, any>
  variant?: Record<string, string>
  pattern?: string
  context?: GenerationContext
  options?: GenerationOptions
}

interface GenerationContext {
  framework?: 'react' | 'vue' | 'angular'
  typescript?: boolean
  styling?: 'css' | 'tailwind' | 'styled-components'
  stateManagement?: 'useState' | 'zustand' | 'redux'
  formLibrary?: 'react-hook-form' | 'formik'
}

interface GenerationOptions {
  includeImports?: boolean
  includeTypes?: boolean
  includeComments?: boolean
  format?: 'functional' | 'class'
  accessibility?: boolean
}

interface CodeGenerationResponse {
  code: string
  imports: string[]
  types?: string
  dependencies?: string[]
  explanation?: string
  suggestions?: CodeSuggestion[]
  alternatives?: AlternativeImplementation[]
}

interface CodeSuggestion {
  type: 'improvement' | 'alternative' | 'warning' | 'tip'
  message: string
  code?: string
  reason: string
}
```

## Quality Assurance Schemas

### Validation and Testing

```typescript
// packages/mcp-server/src/schemas/validation.ts

interface ValidationResult {
  valid: boolean
  score: number
  errors: ValidationError[]
  warnings: ValidationWarning[]
  suggestions: ValidationSuggestion[]
  metadata: ValidationMetadata
}

interface ValidationError {
  id: string
  type: ErrorType
  severity: 'error' | 'warning' | 'info'
  message: string
  location?: SourceLocation
  fix?: AutoFix
  documentation?: string
}

type ErrorType = 
  | 'syntax'
  | 'type'
  | 'accessibility'
  | 'performance'
  | 'style'
  | 'content'
  | 'link'
  | 'example'

interface SourceLocation {
  file: string
  line: number
  column: number
  length?: number
}

interface AutoFix {
  description: string
  changes: CodeChange[]
  confidence: number
}

interface ValidationWarning {
  id: string
  type: string
  message: string
  location?: SourceLocation
  recommendation?: string
}

interface ValidationSuggestion {
  id: string
  type: 'improvement' | 'best-practice' | 'optimization'
  message: string
  benefit: string
  effort: EffortEstimate
}

interface ValidationMetadata {
  duration: number
  timestamp: Date
  version: string
  rules: string[]
  coverage: number
}

interface QualityMetrics {
  documentation: DocumentationQuality
  examples: ExampleQuality
  accessibility: AccessibilityScore
  performance: PerformanceScore
  overall: OverallQuality
}

interface DocumentationQuality {
  completeness: number
  accuracy: number
  clarity: number
  consistency: number
  freshness: number
}

interface ExampleQuality {
  compilation: number
  execution: number
  coverage: number
  diversity: number
  accessibility: number
}

interface AccessibilityScore {
  compliance: number
  coverage: number
  automation: number
  manual: number
}

interface PerformanceScore {
  bundleSize: number
  renderTime: number
  memoryUsage: number
  accessibility: number
}

interface OverallQuality {
  score: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  trends: QualityTrend[]
  recommendations: QualityRecommendation[]
}

interface QualityTrend {
  metric: string
  direction: 'improving' | 'stable' | 'declining'
  change: number
  period: string
}

interface QualityRecommendation {
  priority: UpdatePriority
  description: string
  impact: string
  effort: EffortEstimate
  category: string
}
```

These comprehensive schemas provide type safety, consistency, and clear contracts across all components of the documentation system, ensuring maintainable and reliable code.