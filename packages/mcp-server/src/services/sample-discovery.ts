import * as fs from 'fs'
import * as path from 'path'
import { glob } from 'glob'
import { ComponentSample, SampleAnalysis, SampleRegistry } from '../schemas/sample-schema.js'

/**
 * Service for discovering and analyzing playground sample files
 */
export class SampleDiscoveryService {
  private sampleCache: Map<string, ComponentSample> = new Map()
  private analysisCache: Map<string, SampleAnalysis> = new Map()
  private lastCacheUpdate: number = 0
  private readonly cacheExpiry = 5 * 60 * 1000 // 5 minutes

  constructor(private playgroundPath: string = '') {
    if (!this.playgroundPath) {
      // Default to playground path relative to mcp-server
      this.playgroundPath = path.resolve(process.cwd(), '../playground/src/samples')
    }
  }

  /**
   * Discover all sample files in playground
   */
  async discoverSamples(): Promise<ComponentSample[]> {
    await this.updateCacheIfNeeded()
    return Array.from(this.sampleCache.values())
  }

  /**
   * Get sample for specific component
   */
  async getSampleForComponent(componentName: string): Promise<ComponentSample | null> {
    await this.updateCacheIfNeeded()
    
    // Try exact match first
    const exactMatch = this.sampleCache.get(`${componentName}.sample.tsx`)
    if (exactMatch) return exactMatch

    // Try case-insensitive search
    for (const [fileName, sample] of this.sampleCache) {
      if (sample.componentName.toLowerCase() === componentName.toLowerCase()) {
        return sample
      }
    }

    return null
  }

  /**
   * Search samples by pattern or content
   */
  async searchSamples(query: string): Promise<ComponentSample[]> {
    await this.updateCacheIfNeeded()
    const samples = Array.from(this.sampleCache.values())
    
    return samples.filter(sample => 
      sample.componentName.toLowerCase().includes(query.toLowerCase()) ||
      sample.description.toLowerCase().includes(query.toLowerCase()) ||
      sample.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      sample.content.toLowerCase().includes(query.toLowerCase())
    )
  }

  /**
   * Get sample analysis with extracted patterns
   */
  async getSampleAnalysis(componentName: string): Promise<SampleAnalysis | null> {
    const sample = await this.getSampleForComponent(componentName)
    if (!sample) return null

    const cacheKey = sample.filePath
    if (this.analysisCache.has(cacheKey)) {
      return this.analysisCache.get(cacheKey)!
    }

    const analysis = await this.analyzeSampleFile(sample)
    this.analysisCache.set(cacheKey, analysis)
    return analysis
  }

  /**
   * Get statistics about all samples
   */
  async getSampleStatistics() {
    await this.updateCacheIfNeeded()
    const samples = Array.from(this.sampleCache.values())
    
    const componentCount = new Map<string, number>()
    const tagCount = new Map<string, number>()
    
    samples.forEach(sample => {
      // Count components
      const count = componentCount.get(sample.componentName) || 0
      componentCount.set(sample.componentName, count + 1)
      
      // Count tags
      sample.tags.forEach(tag => {
        const tagCount_ = tagCount.get(tag) || 0
        tagCount.set(tag, tagCount_ + 1)
      })
    })

    return {
      totalSamples: samples.length,
      uniqueComponents: componentCount.size,
      averageSize: Math.round(samples.reduce((sum, s) => sum + s.size, 0) / samples.length),
      componentCoverage: Object.fromEntries(componentCount),
      popularTags: Object.fromEntries(
        Array.from(tagCount.entries())
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10)
      )
    }
  }

  /**
   * Update cache if expired
   */
  private async updateCacheIfNeeded() {
    const now = Date.now()
    if (now - this.lastCacheUpdate > this.cacheExpiry) {
      await this.scanSampleFiles()
      this.lastCacheUpdate = now
    }
  }

  /**
   * Scan playground for sample files
   */
  private async scanSampleFiles() {
    try {
      const pattern = path.join(this.playgroundPath, '*.sample.tsx')
      const files = await glob(pattern)
      
      this.sampleCache.clear()
      this.analysisCache.clear()

      for (const filePath of files) {
        try {
          const sample = await this.processSampleFile(filePath)
          if (sample) {
            const fileName = path.basename(filePath)
            this.sampleCache.set(fileName, sample)
          }
        } catch (error) {
          console.warn(`Failed to process sample file ${filePath}:`, error)
        }
      }

      console.log(`✅ Discovered ${this.sampleCache.size} sample files`)
    } catch (error) {
      console.error('Failed to scan sample files:', error)
    }
  }

  /**
   * Process individual sample file
   */
  private async processSampleFile(filePath: string): Promise<ComponentSample | null> {
    try {
      const content = await fs.promises.readFile(filePath, 'utf-8')
      const stats = await fs.promises.stat(filePath)
      const fileName = path.basename(filePath)
      
      // Extract component name from filename (e.g., "Button.sample.tsx" -> "Button")
      const componentName = fileName.replace('.sample.tsx', '')
      
      // Basic content analysis
      const description = this.extractDescription(content)
      const imports = this.extractImports(content)
      const exports = this.extractExports(content)
      const tags = this.extractTags(content, componentName)
      
      return {
        componentName,
        filePath,
        fileName,
        content,
        size: stats.size,
        lastModified: stats.mtime,
        description,
        imports,
        exports,
        tags,
        examples: [] // Will be populated by analysis
      }
    } catch (error) {
      console.error(`Failed to process sample file ${filePath}:`, error)
      return null
    }
  }

  /**
   * Extract description from sample file
   */
  private extractDescription(content: string): string {
    // Look for JSDoc comment
    const jsdocMatch = content.match(/\/\*\*\s*\n\s*\*\s*(.+?)\s*\n/s)
    if (jsdocMatch) return jsdocMatch[1]

    // Look for ComponentDoc description prop
    const componentDocMatch = content.match(/description=["']([^"']+)["']/s)
    if (componentDocMatch) return componentDocMatch[1]

    // Look for title
    const titleMatch = content.match(/title=["']([^"']+)["']/s)
    if (titleMatch) return `${titleMatch[1]} component examples`

    return `Sample implementations for ${path.basename(this.extractComponentName(content))} component`
  }

  /**
   * Extract imports from sample file
   */
  private extractImports(content: string): string[] {
    const importMatches = content.match(/import\s+.*?from\s+['"][^'"]+['"];?/g) || []
    return importMatches.map(imp => imp.trim())
  }

  /**
   * Extract exports from sample file
   */
  private extractExports(content: string): string[] {
    const exports: string[] = []
    
    // Default export
    const defaultExportMatch = content.match(/export\s+default\s+(?:function\s+)?(\w+)/)
    if (defaultExportMatch) {
      exports.push(defaultExportMatch[1])
    }

    // Named exports
    const namedExportMatches = content.match(/export\s+(?:function|const|class|interface|type)\s+(\w+)/g) || []
    namedExportMatches.forEach(exp => {
      const match = exp.match(/export\s+(?:function|const|class|interface|type)\s+(\w+)/)
      if (match) exports.push(match[1])
    })

    return exports
  }

  /**
   * Extract component name from content
   */
  private extractComponentName(content: string): string {
    // Look for component import from @rs-kit/ui-kit
    const uiKitImportMatch = content.match(/import\s+{[^}]*\b(\w+)\b[^}]*}\s+from\s+['"]@rs-kit\/ui-kit['"]/)
    if (uiKitImportMatch) return uiKitImportMatch[1]

    // Look for function name
    const functionMatch = content.match(/export\s+default\s+function\s+(\w+)/)
    if (functionMatch) return functionMatch[1].replace(/Sample$/, '')

    return 'Unknown'
  }

  /**
   * Extract tags for categorization
   */
  private extractTags(content: string, componentName: string): string[] {
    const tags = new Set<string>()
    
    // Add component name as tag
    tags.add(componentName.toLowerCase())
    
    // Analyze imports to determine categories
    if (content.includes('useForm') || content.includes('zodResolver')) {
      tags.add('form')
      tags.add('validation')
    }
    
    if (content.includes('useState') || content.includes('useEffect')) {
      tags.add('interactive')
      tags.add('stateful')
    }
    
    if (content.includes('toast') || content.includes('alert')) {
      tags.add('feedback')
    }
    
    if (content.includes('Calendar') || content.includes('date')) {
      tags.add('date')
      tags.add('picker')
    }
    
    if (content.includes('Table') || content.includes('data')) {
      tags.add('data-display')
    }
    
    if (content.includes('Navigation') || content.includes('Menu')) {
      tags.add('navigation')
    }
    
    if (content.includes('layout') || content.includes('grid') || content.includes('flex')) {
      tags.add('layout')
    }

    // Determine complexity
    const linesOfCode = content.split('\n').filter(line => line.trim()).length
    if (linesOfCode > 200) {
      tags.add('complex')
    } else if (linesOfCode > 100) {
      tags.add('intermediate')
    } else {
      tags.add('simple')
    }

    return Array.from(tags)
  }

  /**
   * Analyze sample file for patterns and examples
   */
  private async analyzeSampleFile(sample: ComponentSample): Promise<SampleAnalysis> {
    const { content, componentName } = sample
    
    const patterns = this.extractUsagePatterns(content)
    const examples = this.extractCodeExamples(content)
    const bestPractices = this.extractBestPractices(content)
    const dependencies = this.extractDependencies(content)
    
    return {
      componentName,
      filePath: sample.filePath,
      patterns,
      examples,
      bestPractices,
      dependencies,
      complexity: this.calculateComplexity(content),
      interactivity: this.analyzeInteractivity(content),
      props: this.extractPropUsages(content),
      variants: this.extractVariantUsages(content)
    }
  }

  /**
   * Extract usage patterns from sample
   */
  private extractUsagePatterns(content: string): string[] {
    const patterns: string[] = []
    
    if (content.includes('useState')) patterns.push('state-management')
    if (content.includes('useForm')) patterns.push('form-handling')
    if (content.includes('onClick') || content.includes('onSubmit')) patterns.push('event-handling')
    if (content.includes('variant=')) patterns.push('variant-usage')
    if (content.includes('size=')) patterns.push('size-variants')
    if (content.includes('disabled')) patterns.push('disabled-state')
    if (content.includes('loading') || content.includes('isLoading')) patterns.push('loading-state')
    if (content.includes('className')) patterns.push('custom-styling')
    if (content.includes('grid') || content.includes('flex')) patterns.push('layout-composition')
    
    return patterns
  }

  /**
   * Extract code examples from sample
   */
  private extractCodeExamples(content: string): Array<{ type: string; code: string; description: string }> {
    const examples: Array<{ type: string; code: string; description: string }> = []
    
    // Extract JSX components
    const jsxMatches = content.match(/<[A-Z]\w+[^>]*>[\s\S]*?<\/[A-Z]\w+>/g) || []
    
    jsxMatches.forEach((jsx, index) => {
      const componentMatch = jsx.match(/<([A-Z]\w+)/)
      const componentName = componentMatch ? componentMatch[1] : 'Component'
      
      examples.push({
        type: 'basic',
        code: jsx.trim(),
        description: `${componentName} usage example ${index + 1}`
      })
    })
    
    return examples.slice(0, 5) // Limit to 5 examples
  }

  /**
   * Extract best practices from sample
   */
  private extractBestPractices(content: string): string[] {
    const practices: string[] = []
    
    if (content.includes('aria-')) practices.push('Uses proper ARIA attributes for accessibility')
    if (content.includes('type="submit"')) practices.push('Uses semantic HTML form elements')
    if (content.includes('disabled={') && content.includes('loading')) practices.push('Disables interactions during loading states')
    if (content.includes('toast(')) practices.push('Provides user feedback for actions')
    if (content.includes('try {') && content.includes('catch')) practices.push('Implements proper error handling')
    if (content.includes('placeholder=')) practices.push('Provides helpful placeholder text')
    if (content.includes('forwardRef')) practices.push('Supports ref forwarding')
    
    return practices
  }

  /**
   * Extract dependencies from sample
   */
  private extractDependencies(content: string): Array<{ name: string; type: 'ui-kit' | 'external' | 'react' }> {
    const dependencies: Array<{ name: string; type: 'ui-kit' | 'external' | 'react' }> = []
    
    // UI Kit dependencies
    const uiKitMatch = content.match(/import\s+{([^}]+)}\s+from\s+['"]@rs-kit\/ui-kit['"]/)
    if (uiKitMatch) {
      const components = uiKitMatch[1].split(',').map(c => c.trim())
      components.forEach(comp => {
        dependencies.push({ name: comp, type: 'ui-kit' })
      })
    }
    
    // React dependencies
    const reactMatch = content.match(/import\s+{([^}]+)}\s+from\s+['"]react['"]/)
    if (reactMatch) {
      const hooks = reactMatch[1].split(',').map(h => h.trim())
      hooks.forEach(hook => {
        dependencies.push({ name: hook, type: 'react' })
      })
    }
    
    // External dependencies
    const externalMatches = content.match(/import\s+.*?from\s+['"](?!react|@rs-kit)([^'"]+)['"];?/g) || []
    externalMatches.forEach(imp => {
      const match = imp.match(/from\s+['"]([^'"]+)['"]/)
      if (match) {
        dependencies.push({ name: match[1], type: 'external' })
      }
    })
    
    return dependencies
  }

  /**
   * Calculate complexity score
   */
  private calculateComplexity(content: string): 'simple' | 'intermediate' | 'complex' {
    const lines = content.split('\n').filter(line => line.trim()).length
    const hooks = (content.match(/use\w+/g) || []).length
    const components = (content.match(/<[A-Z]\w+/g) || []).length
    
    const score = lines + (hooks * 10) + (components * 5)
    
    if (score > 300) return 'complex'
    if (score > 150) return 'intermediate'
    return 'simple'
  }

  /**
   * Analyze interactivity level
   */
  private analyzeInteractivity(content: string): 'static' | 'interactive' | 'dynamic' {
    const hasState = content.includes('useState')
    const hasEffects = content.includes('useEffect')
    const hasHandlers = content.includes('onClick') || content.includes('onSubmit') || content.includes('onChange')
    
    if (hasState && hasEffects && hasHandlers) return 'dynamic'
    if (hasState || hasHandlers) return 'interactive'
    return 'static'
  }

  /**
   * Extract prop usages
   */
  private extractPropUsages(content: string): Array<{ prop: string; value: string; type: 'literal' | 'variable' | 'expression' }> {
    const props: Array<{ prop: string; value: string; type: 'literal' | 'variable' | 'expression' }> = []
    
    // Extract prop patterns
    const propMatches = content.match(/(\w+)=(?:{([^}]+)}|"([^"]+)"|'([^']+)')/g) || []
    
    propMatches.forEach(match => {
      const [, prop, expression, doubleQuoted, singleQuoted] = match.match(/(\w+)=(?:{([^}]+)}|"([^"]+)"|'([^']+)')/) || []
      
      if (prop && (expression || doubleQuoted || singleQuoted)) {
        const value = expression || doubleQuoted || singleQuoted
        const type = expression ? 'expression' : 'literal'
        props.push({ prop, value, type })
      }
    })
    
    return props
  }

  /**
   * Extract variant usages
   */
  private extractVariantUsages(content: string): Array<{ variant: string; value: string; component: string }> {
    const variants: Array<{ variant: string; value: string; component: string }> = []
    
    const lines = content.split('\n')
    
    lines.forEach(line => {
      const componentMatch = line.match(/<([A-Z]\w+)/)
      if (componentMatch) {
        const component = componentMatch[1]
        
        const variantMatch = line.match(/variant=["']([^"']+)["']/)
        if (variantMatch) {
          variants.push({
            variant: 'variant',
            value: variantMatch[1],
            component
          })
        }
        
        const sizeMatch = line.match(/size=["']([^"']+)["']/)
        if (sizeMatch) {
          variants.push({
            variant: 'size',
            value: sizeMatch[1],
            component
          })
        }
      }
    })
    
    return variants
  }
}