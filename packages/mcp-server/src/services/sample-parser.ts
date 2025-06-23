import * as ts from 'typescript'
import { ComponentSample, SampleAnalysis, UsagePattern } from '../schemas/sample-schema.js'

/**
 * Service for parsing and extracting patterns from sample files
 */
export class SampleParserService {
  private patterns: Map<string, UsagePattern> = new Map()

  /**
   * Parse sample file and extract detailed information
   */
  async parseSample(sample: ComponentSample): Promise<SampleAnalysis> {
    const sourceFile = ts.createSourceFile(
      sample.fileName,
      sample.content,
      ts.ScriptTarget.Latest,
      true
    )

    const analysis: SampleAnalysis = {
      componentName: sample.componentName,
      filePath: sample.filePath,
      patterns: this.extractPatterns(sourceFile),
      examples: this.extractExamples(sourceFile, sample.content),
      bestPractices: this.extractBestPractices(sourceFile, sample.content),
      dependencies: this.extractDependencies(sourceFile),
      complexity: this.calculateComplexity(sourceFile),
      interactivity: this.analyzeInteractivity(sourceFile),
      props: this.extractPropUsages(sourceFile),
      variants: this.extractVariantUsages(sourceFile)
    }

    return analysis
  }

  /**
   * Extract usage patterns from TypeScript AST
   */
  private extractPatterns(sourceFile: ts.SourceFile): string[] {
    const patterns: string[] = []
    
    const visit = (node: ts.Node) => {
      // State management patterns
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
        const callName = node.expression.text
        if (callName === 'useState') patterns.push('useState-pattern')
        if (callName === 'useEffect') patterns.push('useEffect-pattern')
        if (callName === 'useForm') patterns.push('form-management')
        if (callName === 'toast') patterns.push('user-feedback')
      }

      // JSX patterns
      if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
        const tagName = this.getJsxTagName(node)
        if (tagName && tagName[0] === tagName[0].toUpperCase()) {
          patterns.push(`${tagName.toLowerCase()}-usage`)
        }
      }

      // Property patterns
      if (ts.isJsxAttribute(node) && ts.isIdentifier(node.name)) {
        const propName = node.name.text
        if (propName === 'variant') patterns.push('variant-usage')
        if (propName === 'size') patterns.push('size-usage')
        if (propName === 'disabled') patterns.push('disabled-state')
        if (propName === 'onClick') patterns.push('click-handling')
        if (propName === 'onSubmit') patterns.push('form-submission')
      }

      ts.forEachChild(node, visit)
    }

    visit(sourceFile)
    return [...new Set(patterns)] // Remove duplicates
  }

  /**
   * Extract code examples from AST
   */
  private extractExamples(sourceFile: ts.SourceFile, content: string): Array<{ type: string; code: string; description: string }> {
    const examples: Array<{ type: string; code: string; description: string }> = []
    
    const visit = (node: ts.Node) => {
      // Extract JSX elements as examples
      if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
        const tagName = this.getJsxTagName(node)
        if (tagName && tagName[0] === tagName[0].toUpperCase()) {
          const start = node.getStart(sourceFile)
          const end = node.getEnd()
          const code = content.substring(start, end)
          
          // Determine example type
          let type = 'basic'
          if (this.hasStateUsage(node)) type = 'interactive'
          if (this.hasComplexProps(node)) type = 'advanced'
          
          examples.push({
            type,
            code: this.formatCode(code),
            description: `${tagName} ${type} usage example`
          })
        }
      }
      
      ts.forEachChild(node, visit)
    }

    visit(sourceFile)
    return examples.slice(0, 10) // Limit to 10 examples
  }

  /**
   * Extract best practices from code analysis
   */
  private extractBestPractices(sourceFile: ts.SourceFile, content: string): string[] {
    const practices: string[] = []
    
    // Check for accessibility attributes
    if (content.includes('aria-')) {
      practices.push('Uses ARIA attributes for accessibility')
    }
    
    // Check for proper form handling
    if (content.includes('type="submit"') && content.includes('onSubmit')) {
      practices.push('Implements proper form submission handling')
    }
    
    // Check for loading states
    if (content.includes('disabled={') && content.includes('loading')) {
      practices.push('Provides loading state feedback')
    }
    
    // Check for error handling
    if (content.includes('try {') && content.includes('catch')) {
      practices.push('Implements error handling')
    }
    
    // Check for TypeScript usage
    if (content.includes(': ') && content.includes('interface')) {
      practices.push('Uses TypeScript for type safety')
    }
    
    // Check for proper imports
    if (content.includes('import {') && content.includes('@rs-kit/ui-kit')) {
      practices.push('Uses proper component imports')
    }

    return practices
  }

  /**
   * Extract dependencies from imports
   */
  private extractDependencies(sourceFile: ts.SourceFile): Array<{ name: string; type: 'ui-kit' | 'external' | 'react' }> {
    const dependencies: Array<{ name: string; type: 'ui-kit' | 'external' | 'react' }> = []
    
    const visit = (node: ts.Node) => {
      if (ts.isImportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        const moduleName = node.moduleSpecifier.text
        
        let type: 'ui-kit' | 'external' | 'react'
        if (moduleName === '@rs-kit/ui-kit') type = 'ui-kit'
        else if (moduleName === 'react' || moduleName.startsWith('react/')) type = 'react'
        else type = 'external'
        
        if (node.importClause && node.importClause.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
          node.importClause.namedBindings.elements.forEach(element => {
            dependencies.push({
              name: element.name.text,
              type
            })
          })
        }
      }
      
      ts.forEachChild(node, visit)
    }
    
    visit(sourceFile)
    return dependencies
  }

  /**
   * Calculate complexity based on AST analysis
   */
  private calculateComplexity(sourceFile: ts.SourceFile): 'simple' | 'intermediate' | 'complex' {
    let complexity = 0
    
    const visit = (node: ts.Node) => {
      // Count function declarations
      if (ts.isFunctionDeclaration(node) || ts.isArrowFunction(node)) complexity += 5
      
      // Count hooks
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text.startsWith('use')) {
        complexity += 10
      }
      
      // Count JSX elements
      if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) complexity += 2
      
      // Count conditional rendering
      if (ts.isConditionalExpression(node)) complexity += 3
      
      // Count loops
      if (ts.isForStatement(node) || ts.isWhileStatement(node)) complexity += 5
      
      ts.forEachChild(node, visit)
    }
    
    visit(sourceFile)
    
    if (complexity > 50) return 'complex'
    if (complexity > 25) return 'intermediate'
    return 'simple'
  }

  /**
   * Analyze interactivity level
   */
  private analyzeInteractivity(sourceFile: ts.SourceFile): 'static' | 'interactive' | 'dynamic' {
    let hasState = false
    let hasEffects = false
    let hasHandlers = false
    
    const visit = (node: ts.Node) => {
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
        const callName = node.expression.text
        if (callName === 'useState') hasState = true
        if (callName === 'useEffect') hasEffects = true
      }
      
      if (ts.isJsxAttribute(node) && ts.isIdentifier(node.name)) {
        const propName = node.name.text
        if (propName.startsWith('on')) hasHandlers = true
      }
      
      ts.forEachChild(node, visit)
    }
    
    visit(sourceFile)
    
    if (hasState && hasEffects && hasHandlers) return 'dynamic'
    if (hasState || hasHandlers) return 'interactive'
    return 'static'
  }

  /**
   * Extract prop usages from JSX
   */
  private extractPropUsages(sourceFile: ts.SourceFile): Array<{ prop: string; value: string; type: 'literal' | 'variable' | 'expression' }> {
    const props: Array<{ prop: string; value: string; type: 'literal' | 'variable' | 'expression' }> = []
    
    const visit = (node: ts.Node) => {
      if (ts.isJsxAttribute(node) && ts.isIdentifier(node.name)) {
        const prop = node.name.text
        let value = ''
        let type: 'literal' | 'variable' | 'expression' = 'literal'
        
        if (node.initializer) {
          if (ts.isStringLiteral(node.initializer)) {
            value = node.initializer.text
            type = 'literal'
          } else if (ts.isJsxExpression(node.initializer) && node.initializer.expression) {
            value = node.initializer.expression.getText(sourceFile)
            type = ts.isIdentifier(node.initializer.expression) ? 'variable' : 'expression'
          }
        }
        
        if (value) {
          props.push({ prop, value, type })
        }
      }
      
      ts.forEachChild(node, visit)
    }
    
    visit(sourceFile)
    return props
  }

  /**
   * Extract variant usages
   */
  private extractVariantUsages(sourceFile: ts.SourceFile): Array<{ variant: string; value: string; component: string }> {
    const variants: Array<{ variant: string; value: string; component: string }> = []
    
    const visit = (node: ts.Node) => {
      if ((ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node))) {
        const tagName = this.getJsxTagName(node)
        if (!tagName || tagName[0] !== tagName[0].toUpperCase()) return
        
        const attributes = ts.isJsxElement(node) ? node.openingElement.attributes : node.attributes
        
        attributes.properties.forEach(attr => {
          if (ts.isJsxAttribute(attr) && ts.isIdentifier(attr.name)) {
            const propName = attr.name.text
            if (propName === 'variant' || propName === 'size' || propName === 'color') {
              let value = ''
              if (attr.initializer && ts.isStringLiteral(attr.initializer)) {
                value = attr.initializer.text
              } else if (attr.initializer && ts.isJsxExpression(attr.initializer) && attr.initializer.expression) {
                value = attr.initializer.expression.getText(sourceFile)
              }
              
              if (value) {
                variants.push({
                  variant: propName,
                  value,
                  component: tagName
                })
              }
            }
          }
        })
      }
      
      ts.forEachChild(node, visit)
    }
    
    visit(sourceFile)
    return variants
  }

  /**
   * Get JSX tag name from element
   */
  private getJsxTagName(node: ts.JsxElement | ts.JsxSelfClosingElement): string | undefined {
    const tagName = ts.isJsxElement(node) ? node.openingElement.tagName : node.tagName
    
    if (ts.isIdentifier(tagName)) {
      return tagName.text
    }
    
    return undefined
  }

  /**
   * Check if JSX element uses state
   */
  private hasStateUsage(node: ts.Node): boolean {
    let hasState = false
    
    const visit = (child: ts.Node) => {
      if (ts.isJsxExpression(child) && child.expression && ts.isIdentifier(child.expression)) {
        // Check if identifier looks like state variable
        const name = child.expression.text
        if (name.startsWith('is') || name.startsWith('has') || name.includes('State')) {
          hasState = true
        }
      }
      ts.forEachChild(child, visit)
    }
    
    visit(node)
    return hasState
  }

  /**
   * Check if JSX element has complex props
   */
  private hasComplexProps(node: ts.Node): boolean {
    let complex = false
    
    const visit = (child: ts.Node) => {
      if (ts.isJsxAttribute(child) && child.initializer && ts.isJsxExpression(child.initializer)) {
        if (child.initializer.expression && !ts.isIdentifier(child.initializer.expression)) {
          complex = true
        }
      }
      ts.forEachChild(child, visit)
    }
    
    visit(node)
    return complex
  }

  /**
   * Format code for display
   */
  private formatCode(code: string): string {
    return code
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n')
      .replace(/\s+/g, ' ')
      .trim()
  }

  /**
   * Extract usage patterns across all samples
   */
  async extractUsagePatterns(samples: ComponentSample[]): Promise<UsagePattern[]> {
    const patternMap = new Map<string, {
      count: number
      components: Set<string>
      examples: Array<{ componentName: string; code: string; context: string }>
    }>()

    for (const sample of samples) {
      const analysis = await this.parseSample(sample)
      
      analysis.patterns.forEach(pattern => {
        if (!patternMap.has(pattern)) {
          patternMap.set(pattern, {
            count: 0,
            components: new Set(),
            examples: []
          })
        }
        
        const patternData = patternMap.get(pattern)!
        patternData.count++
        patternData.components.add(sample.componentName)
        
        // Add example if we have fewer than 3
        if (patternData.examples.length < 3 && analysis.examples.length > 0) {
          patternData.examples.push({
            componentName: sample.componentName,
            code: analysis.examples[0].code,
            context: analysis.examples[0].description
          })
        }
      })
    }

    return Array.from(patternMap.entries()).map(([patternName, data]) => ({
      patternName,
      description: this.getPatternDescription(patternName),
      frequency: data.count,
      components: Array.from(data.components),
      examples: data.examples,
      bestPractices: this.getPatternBestPractices(patternName)
    }))
  }

  /**
   * Get description for pattern
   */
  private getPatternDescription(pattern: string): string {
    const descriptions: Record<string, string> = {
      'useState-pattern': 'Component uses React state management',
      'useEffect-pattern': 'Component uses side effects with useEffect',
      'form-management': 'Component implements form handling with validation',
      'user-feedback': 'Component provides user feedback with toasts or alerts',
      'variant-usage': 'Component uses variant props for styling variations',
      'size-usage': 'Component uses size props for different sizes',
      'disabled-state': 'Component handles disabled state',
      'click-handling': 'Component handles click events',
      'form-submission': 'Component handles form submission'
    }
    
    return descriptions[pattern] || `Usage pattern: ${pattern}`
  }

  /**
   * Get best practices for pattern
   */
  private getPatternBestPractices(pattern: string): string[] {
    const practices: Record<string, string[]> = {
      'useState-pattern': [
        'Initialize state with appropriate default values',
        'Use functional updates when new state depends on previous state',
        'Consider using useReducer for complex state logic'
      ],
      'form-management': [
        'Use proper form validation',
        'Provide clear error messages',
        'Handle loading and disabled states during submission'
      ],
      'variant-usage': [
        'Provide sensible default variants',
        'Use semantic variant names',
        'Ensure variants are accessible'
      ]
    }
    
    return practices[pattern] || []
  }
}