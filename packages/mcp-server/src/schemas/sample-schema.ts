import { z } from 'zod'

/**
 * Schema for a playground sample file
 */
export const ComponentSampleSchema = z.object({
  componentName: z.string(),
  filePath: z.string(),
  fileName: z.string(),
  content: z.string(),
  size: z.number(),
  lastModified: z.date(),
  description: z.string(),
  imports: z.array(z.string()),
  exports: z.array(z.string()),
  tags: z.array(z.string()),
  examples: z.array(z.object({
    type: z.string(),
    code: z.string(),
    description: z.string()
  }))
})

export type ComponentSample = z.infer<typeof ComponentSampleSchema>

/**
 * Schema for sample analysis results
 */
export const SampleAnalysisSchema = z.object({
  componentName: z.string(),
  filePath: z.string(),
  patterns: z.array(z.string()),
  examples: z.array(z.object({
    type: z.string(),
    code: z.string(),
    description: z.string()
  })),
  bestPractices: z.array(z.string()),
  dependencies: z.array(z.object({
    name: z.string(),
    type: z.enum(['ui-kit', 'external', 'react'])
  })),
  complexity: z.enum(['simple', 'intermediate', 'complex']),
  interactivity: z.enum(['static', 'interactive', 'dynamic']),
  props: z.array(z.object({
    prop: z.string(),
    value: z.string(),
    type: z.enum(['literal', 'variable', 'expression'])
  })),
  variants: z.array(z.object({
    variant: z.string(),
    value: z.string(),
    component: z.string()
  }))
})

export type SampleAnalysis = z.infer<typeof SampleAnalysisSchema>

/**
 * Schema for sample registry
 */
export const SampleRegistrySchema = z.object({
  lastUpdate: z.date(),
  samples: z.record(z.string(), ComponentSampleSchema),
  statistics: z.object({
    totalSamples: z.number(),
    uniqueComponents: z.number(),
    averageSize: z.number(),
    componentCoverage: z.record(z.string(), z.number()),
    popularTags: z.record(z.string(), z.number())
  })
})

export type SampleRegistry = z.infer<typeof SampleRegistrySchema>

/**
 * Schema for usage pattern extraction
 */
export const UsagePatternSchema = z.object({
  patternName: z.string(),
  description: z.string(),
  frequency: z.number(),
  components: z.array(z.string()),
  examples: z.array(z.object({
    componentName: z.string(),
    code: z.string(),
    context: z.string()
  })),
  bestPractices: z.array(z.string())
})

export type UsagePattern = z.infer<typeof UsagePatternSchema>

/**
 * Schema for sample search results
 */
export const SampleSearchResultSchema = z.object({
  samples: z.array(ComponentSampleSchema),
  totalResults: z.number(),
  searchQuery: z.string(),
  filters: z.object({
    tags: z.array(z.string()).optional(),
    complexity: z.enum(['simple', 'intermediate', 'complex']).optional(),
    interactivity: z.enum(['static', 'interactive', 'dynamic']).optional(),
    component: z.string().optional()
  }).optional()
})

export type SampleSearchResult = z.infer<typeof SampleSearchResultSchema>

/**
 * Schema for code generation request with sample context
 */
export const SampleBasedCodeGenRequestSchema = z.object({
  componentName: z.string(),
  style: z.enum(['basic', 'advanced', 'interactive', 'realistic']),
  props: z.record(z.string(), z.any()).optional(),
  context: z.object({
    usecase: z.string().optional(),
    complexity: z.enum(['simple', 'intermediate', 'complex']).optional(),
    includeState: z.boolean().optional(),
    includeHandlers: z.boolean().optional(),
    basedOnSample: z.string().optional() // Sample file name to base generation on
  }).optional()
})

export type SampleBasedCodeGenRequest = z.infer<typeof SampleBasedCodeGenRequestSchema>

/**
 * Schema for generated code response
 */
export const GeneratedCodeResponseSchema = z.object({
  code: z.string(),
  imports: z.array(z.string()),
  description: z.string(),
  basedOnSample: z.string().optional(),
  complexity: z.enum(['simple', 'intermediate', 'complex']),
  features: z.array(z.string()),
  bestPractices: z.array(z.string())
})

export type GeneratedCodeResponse = z.infer<typeof GeneratedCodeResponseSchema>