// import { ComponentInfo, CodeGenerationStyle } from '../schemas/component-schema.js'
import { ComponentSample, SampleAnalysis, SampleBasedCodeGenRequest, GeneratedCodeResponse } from '../schemas/sample-schema.js'
import { SampleDiscoveryService } from './sample-discovery.js'
import { SampleParserService } from './sample-parser.js'

/**
 * Enhanced code generation service that uses playground samples for realistic code generation
 */
export class SampleBasedCodeGenerationService {
  private sampleDiscovery: SampleDiscoveryService
  private sampleParser: SampleParserService

  constructor(playgroundPath?: string) {
    this.sampleDiscovery = new SampleDiscoveryService(playgroundPath)
    this.sampleParser = new SampleParserService()
  }

  /**
   * Generate code based on sample patterns and real usage
   */
  async generateRealisticCode(request: SampleBasedCodeGenRequest): Promise<GeneratedCodeResponse> {
    const { componentName, style, props, context } = request
    
    // Get sample for the component
    const sample = await this.sampleDiscovery.getSampleForComponent(componentName)
    if (!sample) {
      throw new Error(`No sample found for component: ${componentName}`)
    }

    // Get sample analysis
    const analysis = await this.sampleParser.parseSample(sample)
    
    // Generate code based on style and sample data
    switch (style) {
      case 'basic':
        return this.generateBasicUsage(sample, analysis, props)
      case 'advanced':
        return this.generateAdvancedUsage(sample, analysis, props)
      case 'interactive':
        return this.generateInteractiveUsage(sample, analysis, props)
      case 'realistic':
        return this.generateRealisticUsage(sample, analysis, props, context)
      default:
        return this.generateBasicUsage(sample, analysis, props)
    }
  }

  /**
   * Generate basic usage code from sample
   */
  private async generateBasicUsage(
    sample: ComponentSample, 
    analysis: SampleAnalysis, 
    props?: Record<string, any>
  ): Promise<GeneratedCodeResponse> {
    const { componentName } = sample
    
    // Find simplest example from sample
    const basicExample = analysis.examples.find(ex => ex.type === 'basic') || analysis.examples[0]
    
    let code = ''
    if (basicExample) {
      // Use actual sample code as base
      code = basicExample.code
      
      // Apply custom props if provided
      if (props) {
        code = this.applyPropsToCode(code, props)
      }
    } else {
      // Fallback to simple component usage
      const propsString = props ? this.propsToString(props) : ''
      code = `<${componentName}${propsString}>\n  Content\n</${componentName}>`
    }

    const imports = this.extractImportsFromSample(sample)
    
    return {
      code: this.formatCode(code),
      imports,
      description: `Basic ${componentName} usage based on playground sample`,
      basedOnSample: sample.fileName,
      complexity: 'simple',
      features: ['basic-usage'],
      bestPractices: analysis.bestPractices.slice(0, 3)
    }
  }

  /**
   * Generate advanced usage code from sample
   */
  private async generateAdvancedUsage(
    sample: ComponentSample, 
    analysis: SampleAnalysis, 
    props?: Record<string, any>
  ): Promise<GeneratedCodeResponse> {
    const { componentName } = sample
    
    // Find advanced example or create composite usage
    const advancedExample = analysis.examples.find(ex => ex.type === 'advanced') 
    
    let code = ''
    let features: string[] = []
    
    if (advancedExample) {
      code = advancedExample.code
      features = ['advanced-props', 'complex-composition']
    } else {
      // Create advanced usage by combining patterns
      code = this.createAdvancedComposition(sample, analysis, props)
      features = ['multiple-variants', 'prop-combinations', 'complex-layout']
    }

    if (props) {
      code = this.applyPropsToCode(code, props)
    }

    const imports = this.extractImportsFromSample(sample)
    
    return {
      code: this.formatCode(code),
      imports,
      description: `Advanced ${componentName} usage with complex props and composition`,
      basedOnSample: sample.fileName,
      complexity: 'intermediate',
      features,
      bestPractices: analysis.bestPractices
    }
  }

  /**
   * Generate interactive usage code from sample
   */
  private async generateInteractiveUsage(
    sample: ComponentSample, 
    analysis: SampleAnalysis, 
    props?: Record<string, any>
  ): Promise<GeneratedCodeResponse> {
    const { componentName } = sample
    
    // Find interactive examples with state
    const interactiveExamples = analysis.examples.filter(ex => 
      ex.code.includes('useState') || ex.code.includes('onClick') || ex.code.includes('onChange')
    )
    
    let code = ''
    let features: string[] = []
    
    if (interactiveExamples.length > 0) {
      // Use existing interactive pattern
      code = this.createInteractiveComponent(sample, analysis, interactiveExamples[0])
      features = ['state-management', 'event-handling', 'interactive-demo']
    } else {
      // Create interactive version
      code = this.createInteractiveVersion(sample, analysis, props)
      features = ['added-interactivity', 'state-management', 'user-interaction']
    }

    const imports = this.extractImportsFromSample(sample)
    
    return {
      code: this.formatCode(code),
      imports: [...imports, "import { useState } from 'react'"],
      description: `Interactive ${componentName} example with state management`,
      basedOnSample: sample.fileName,
      complexity: 'intermediate',
      features,
      bestPractices: [
        ...analysis.bestPractices,
        'Uses React state for interactivity',
        'Provides user feedback for actions'
      ]
    }
  }

  /**
   * Generate realistic usage code from sample with full context
   */
  private async generateRealisticUsage(
    sample: ComponentSample, 
    analysis: SampleAnalysis, 
    props?: Record<string, any>,
    context?: any
  ): Promise<GeneratedCodeResponse> {
    const { componentName } = sample
    
    // Use the most comprehensive example from sample
    const realisticExample = this.findBestRealisticExample(analysis)
    
    let code = ''
    let features: string[] = []
    
    if (realisticExample) {
      // Extract a realistic section from the sample
      code = this.extractRealisticSection(sample, realisticExample)
      features = ['real-world-usage', 'production-ready', 'best-practices']
    } else {
      // Create realistic usage based on patterns
      code = this.createRealisticImplementation(sample, analysis, props, context)
      features = ['realistic-props', 'proper-composition', 'error-handling']
    }

    const imports = this.extractImportsFromSample(sample)
    
    return {
      code: this.formatCode(code),
      imports,
      description: `Production-ready ${componentName} implementation based on playground patterns`,
      basedOnSample: sample.fileName,
      complexity: analysis.complexity,
      features,
      bestPractices: analysis.bestPractices
    }
  }

  /**
   * Find the best realistic example from analysis
   */
  private findBestRealisticExample(analysis: SampleAnalysis) {
    // Prioritize examples with good balance of features
    return analysis.examples.find(ex => 
      ex.code.length > 100 && 
      ex.code.length < 500 &&
      (ex.type === 'advanced' || ex.type === 'interactive')
    ) || analysis.examples[0]
  }

  /**
   * Extract realistic section from sample content
   */
  private extractRealisticSection(sample: ComponentSample, example: any): string {
    const { content } = sample
    
    // Look for a complete component example
    const componentRegex = /<(\w+)[\s\S]*?<\/\1>|<\w+[^>]*\/>/g
    const matches = content.match(componentRegex)
    
    if (matches && matches.length > 0) {
      // Return the most complex example
      const complexExample = matches.reduce((prev, curr) => 
        curr.length > prev.length ? curr : prev
      )
      return complexExample
    }
    
    return example.code
  }

  /**
   * Create advanced composition from sample patterns
   */
  private createAdvancedComposition(sample: ComponentSample, analysis: SampleAnalysis, props?: Record<string, any>): string {
    const { componentName } = sample
    
    // Get variant usages from sample
    const variants = analysis.variants.filter(v => v.component === componentName)
    
    let code = `<div className="space-y-4">\n`
    
    if (variants.length > 0) {
      // Create examples with different variants
      variants.forEach((variant, index) => {
        const propsString = props ? this.propsToString(props) : ''
        code += `  <${componentName} ${variant.variant}="${variant.value}"${propsString}>\n`
        code += `    ${componentName} with ${variant.value} ${variant.variant}\n`
        code += `  </${componentName}>\n`
        if (index < variants.length - 1) code += '\n'
      })
    } else {
      // Fallback composition
      const propsString = props ? this.propsToString(props) : ''
      code += `  <${componentName}${propsString}>\n    Advanced ${componentName} usage\n  </${componentName}>\n`
    }
    
    code += `</div>`
    
    return code
  }

  /**
   * Create interactive component with state
   */
  private createInteractiveComponent(sample: ComponentSample, analysis: SampleAnalysis, example: any): string {
    const { componentName } = sample
    
    // Extract state patterns from the example
    const hasState = example.code.includes('useState')
    const hasHandlers = example.code.includes('onClick') || example.code.includes('onChange')
    
    if (hasState && hasHandlers) {
      return example.code
    }
    
    // Create interactive version
    return this.createInteractiveVersion(sample, analysis)
  }

  /**
   * Create interactive version of component
   */
  private createInteractiveVersion(sample: ComponentSample, analysis: SampleAnalysis, props?: Record<string, any>): string {
    const { componentName } = sample
    
    // Determine appropriate state based on component type
    let stateLogic = ''
    let interactiveProps = ''
    
    if (componentName.toLowerCase().includes('button')) {
      stateLogic = `const [isLoading, setIsLoading] = useState(false)
  const [count, setCount] = useState(0)
  
  const handleClick = () => {
    setCount(prev => prev + 1)
  }`
      interactiveProps = 'onClick={handleClick} disabled={isLoading}'
    } else if (componentName.toLowerCase().includes('input')) {
      stateLogic = `const [value, setValue] = useState('')
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }`
      interactiveProps = 'value={value} onChange={handleChange}'
    } else if (componentName.toLowerCase().includes('switch') || componentName.toLowerCase().includes('checkbox')) {
      stateLogic = `const [checked, setChecked] = useState(false)
  
  const handleChange = (checked: boolean) => {
    setChecked(checked)
  }`
      interactiveProps = 'checked={checked} onCheckedChange={handleChange}'
    } else {
      // Generic interactive state
      stateLogic = `const [isActive, setIsActive] = useState(false)
  
  const handleToggle = () => {
    setIsActive(prev => !prev)
  }`
      interactiveProps = 'onClick={handleToggle}'
    }

    const propsString = props ? this.propsToString(props) : ''
    
    return `function Interactive${componentName}Example() {
  ${stateLogic}

  return (
    <${componentName} ${interactiveProps}${propsString}>
      Interactive ${componentName}
    </${componentName}>
  )
}`
  }

  /**
   * Create realistic implementation with full context
   */
  private createRealisticImplementation(
    sample: ComponentSample, 
    analysis: SampleAnalysis, 
    props?: Record<string, any>,
    context?: any
  ): string {
    const { componentName } = sample
    
    // Create realistic implementation based on context
    if (context?.usecase) {
      return this.createUseCaseImplementation(sample, analysis, context.usecase, props)
    }
    
    // Default realistic implementation
    return this.createDefaultRealisticImplementation(sample, analysis, props)
  }

  /**
   * Create use case specific implementation
   */
  private createUseCaseImplementation(
    sample: ComponentSample, 
    analysis: SampleAnalysis, 
    usecase: string, 
    props?: Record<string, any>
  ): string {
    const { componentName } = sample
    
    if (usecase.toLowerCase().includes('form')) {
      return this.createFormImplementation(sample, props)
    } else if (usecase.toLowerCase().includes('dashboard')) {
      return this.createDashboardImplementation(sample, props)
    } else if (usecase.toLowerCase().includes('navigation')) {
      return this.createNavigationImplementation(sample, props)
    }
    
    return this.createDefaultRealisticImplementation(sample, analysis, props)
  }

  /**
   * Create form-specific implementation
   */
  private createFormImplementation(sample: ComponentSample, props?: Record<string, any>): string {
    const { componentName } = sample
    const propsString = props ? this.propsToString(props) : ''
    
    if (componentName.toLowerCase().includes('input')) {
      return `<FormField
  name="field"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Label</FormLabel>
      <FormControl>
        <${componentName} placeholder="Enter value"${propsString} {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>`
    } else if (componentName.toLowerCase().includes('button')) {
      return `<${componentName} type="submit"${propsString}>
  Submit Form
</${componentName}>`
    }
    
    return `<${componentName}${propsString}>Form ${componentName}</${componentName}>`
  }

  /**
   * Create dashboard-specific implementation
   */
  private createDashboardImplementation(sample: ComponentSample, props?: Record<string, any>): string {
    const { componentName } = sample
    const propsString = props ? this.propsToString(props) : ''
    
    if (componentName.toLowerCase().includes('card')) {
      return `<${componentName}${propsString}>
  <CardHeader>
    <CardTitle>Dashboard Metric</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">1,234</div>
    <p className="text-muted-foreground">+10% from last month</p>
  </CardContent>
</${componentName}>`
    }
    
    return `<${componentName}${propsString}>Dashboard ${componentName}</${componentName}>`
  }

  /**
   * Create navigation-specific implementation
   */
  private createNavigationImplementation(sample: ComponentSample, props?: Record<string, any>): string {
    const { componentName } = sample
    const propsString = props ? this.propsToString(props) : ''
    
    return `<${componentName}${propsString}>
  Navigation ${componentName}
</${componentName}>`
  }

  /**
   * Create default realistic implementation
   */
  private createDefaultRealisticImplementation(
    sample: ComponentSample, 
    analysis: SampleAnalysis, 
    props?: Record<string, any>
  ): string {
    const { componentName } = sample
    const propsString = props ? this.propsToString(props) : ''
    
    // Use the most representative example from analysis
    if (analysis.examples.length > 0) {
      const bestExample = analysis.examples[0]
      return props ? this.applyPropsToCode(bestExample.code, props) : bestExample.code
    }
    
    return `<${componentName}${propsString}>
  Realistic ${componentName} usage
</${componentName}>`
  }

  /**
   * Apply custom props to existing code
   */
  private applyPropsToCode(code: string, props: Record<string, any>): string {
    let modifiedCode = code
    
    Object.entries(props).forEach(([key, value]) => {
      const propValue = typeof value === 'string' ? `"${value}"` : `{${JSON.stringify(value)}}`
      const propString = `${key}=${propValue}`
      
      // Check if prop already exists
      const existingPropRegex = new RegExp(`${key}=(?:"[^"]*"|{[^}]*})`)
      if (existingPropRegex.test(modifiedCode)) {
        // Replace existing prop
        modifiedCode = modifiedCode.replace(existingPropRegex, propString)
      } else {
        // Add new prop
        const tagRegex = /(<\w+)([^>]*)(>|\/>)/
        modifiedCode = modifiedCode.replace(tagRegex, `$1$2 ${propString}$3`)
      }
    })
    
    return modifiedCode
  }

  /**
   * Convert props object to string
   */
  private propsToString(props: Record<string, any>): string {
    return Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return ` ${key}="${value}"`
        } else if (typeof value === 'boolean' && value) {
          return ` ${key}`
        } else {
          return ` ${key}={${JSON.stringify(value)}}`
        }
      })
      .join('')
  }

  /**
   * Extract imports from sample
   */
  private extractImportsFromSample(sample: ComponentSample): string[] {
    const uiKitImports = sample.imports.filter(imp => imp.includes('@rs-kit/ui-kit'))
    if (uiKitImports.length === 0) {
      return [`import { ${sample.componentName} } from '@rs-kit/ui-kit'`]
    }
    return uiKitImports
  }

  /**
   * Format code for display
   */
  private formatCode(code: string): string {
    return code
      .split('\n')
      .map(line => line.trimEnd())
      .join('\n')
      .trim()
  }
}