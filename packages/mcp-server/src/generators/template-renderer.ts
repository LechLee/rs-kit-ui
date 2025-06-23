/**
 * Template Renderer
 * 
 * Mustache-style template rendering for documentation generation
 */

import { readFile } from 'fs/promises'
import { resolve } from 'path'
import type { ComponentDocumentation, TemplateContext } from '../schemas/documentation.js'

export class TemplateRenderer {
  private templatesDir: string

  constructor(templatesDir: string) {
    this.templatesDir = templatesDir
  }

  /**
   * Render a template with the given context
   */
  async renderTemplate(templateName: string, context: TemplateContext): Promise<string> {
    const templatePath = resolve(this.templatesDir, templateName)
    const template = await readFile(templatePath, 'utf-8')
    
    return this.render(template, context)
  }

  /**
   * Render template string with context
   */
  render(template: string, context: any): string {
    let result = template

    // Flatten context for easier access
    const flatContext = this.flattenContext(context)

    // Handle conditional blocks first {{#condition}}...{{/condition}}
    result = this.renderConditionals(result, flatContext)

    // Handle loops {{#array}}...{{/array}}
    result = this.renderLoops(result, flatContext)

    // Handle simple variable substitution {{variable}}
    result = result.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      const value = flatContext[key]
      return value !== undefined ? String(value) : ''
    })

    // Handle dot notation {{object.property}}
    result = result.replace(/\{\{([\w.]+)\}\}/g, (match, key) => {
      const value = this.getValue(flatContext, key)
      return value !== undefined ? String(value) : ''
    })

    return result
  }

  /**
   * Flatten nested context object
   */
  private flattenContext(context: any): any {
    const flattened: any = {}
    
    // If context has a component property, flatten it to the top level
    if (context.component) {
      Object.assign(flattened, context.component)
    }
    
    // Add other top-level properties
    Object.assign(flattened, context)
    
    return flattened
  }

  /**
   * Get value from context using dot notation
   */
  private getValue(context: any, key: string): any {
    const keys = key.split('.')
    let value = context

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return undefined
      }
    }

    return value
  }

  /**
   * Render conditional blocks
   */
  private renderConditionals(template: string, context: any): string {
    return template.replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (match, key, content) => {
      const value = this.getValue(context, key)
      
      if (this.isTruthy(value)) {
        return this.render(content, context)
      }
      
      return ''
    })
  }

  /**
   * Render loop blocks
   */
  private renderLoops(template: string, context: any): string {
    return template.replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (match, key, content) => {
      const value = this.getValue(context, key)
      
      if (Array.isArray(value)) {
        return value.map(item => {
          const itemContext = { ...context, ...item }
          return this.render(content, itemContext)
        }).join('')
      }
      
      return ''
    })
  }

  /**
   * Check if value is truthy for template conditions
   */
  private isTruthy(value: any): boolean {
    if (value === null || value === undefined) {
      return false
    }
    
    if (typeof value === 'boolean') {
      return value
    }
    
    if (typeof value === 'number') {
      return value !== 0
    }
    
    if (typeof value === 'string') {
      return value.length > 0
    }
    
    if (Array.isArray(value)) {
      return value.length > 0
    }
    
    if (typeof value === 'object') {
      return Object.keys(value).length > 0
    }
    
    return !!value
  }
}

/**
 * Create prop table markdown
 */
export function createPropTable(props: any[]): string {
  if (props.length === 0) {
    return '_No props available._'
  }

  const headers = '| Name | Type | Description | Required | Default |'
  const separator = '|------|------|-------------|----------|---------|'
  
  const rows = props.map(prop => {
    const name = `\`${prop.name}\``
    const type = `\`${prop.type}\``
    const description = prop.description || '-'
    const required = prop.required ? '✅' : '❌'
    const defaultValue = prop.defaultValue ? `\`${prop.defaultValue}\`` : '-'
    
    return `| ${name} | ${type} | ${description} | ${required} | ${defaultValue} |`
  })

  return [headers, separator, ...rows].join('\n')
}

/**
 * Create variant table markdown
 */
export function createVariantTable(variants: any[]): string {
  if (variants.length === 0) {
    return '_No variants available._'
  }

  const tables = variants.map(variant => {
    const headers = `| ${variant.name} | Description |`
    const separator = '|------|-------------|'
    
    const rows = variant.options.map((option: any) => {
      const value = `\`${option.value}\``
      const description = option.description || '-'
      const isDefault = variant.defaultValue === option.value ? ' (default)' : ''
      
      return `| ${value}${isDefault} | ${description} |`
    })

    return [
      `#### ${variant.name}`,
      '',
      headers,
      separator,
      ...rows,
      ''
    ].join('\n')
  })

  return tables.join('\n')
}

/**
 * Generate basic usage example
 */
export function generateBasicExample(componentName: string, props: any[] = []): string {
  const requiredProps = props.filter(prop => prop.required && prop.name !== 'children')
  
  let propsString = ''
  if (requiredProps.length > 0) {
    const propExamples = requiredProps.map(prop => {
      if (prop.type.includes('string')) {
        return `${prop.name}="example"`
      }
      if (prop.type.includes('boolean')) {
        return prop.name
      }
      if (prop.type.includes('number')) {
        return `${prop.name}={42}`
      }
      return `${prop.name}={/* value */}`
    })
    propsString = ' ' + propExamples.join(' ')
  }

  // Check if component typically has children
  const hasChildren = props.some(prop => prop.name === 'children')
  
  if (hasChildren) {
    return `<${componentName}${propsString}>
  Content
</${componentName}>`
  }
  
  return `<${componentName}${propsString} />`
}

// TemplateRenderer is already exported in the class declaration