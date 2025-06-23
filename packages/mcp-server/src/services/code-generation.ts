/**
 * Code Generation Service
 * 
 * Service for generating component usage code and examples
 */

import { ComponentDiscoveryService } from './component-discovery.js'
import type { ComponentProp, ComponentVariant } from '../schemas/documentation.js'

export interface CodeGenOptions {
  includeImport?: boolean
  style?: 'basic' | 'advanced' | 'example'
  typescript?: boolean
  withComments?: boolean
  indentation?: number
}

export interface GeneratedCode {
  imports: string
  usage: string
  complete: string
}

export class CodeGenerationService {
  private discoveryService: ComponentDiscoveryService
  private projectRoot: string

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot
    this.discoveryService = new ComponentDiscoveryService(projectRoot)
  }

  async initialize(): Promise<void> {
    await this.discoveryService.initialize()
  }

  /**
   * Generate component usage code
   */
  async generateComponentUsage(
    componentName: string,
    props: Record<string, any> = {},
    options: CodeGenOptions = {}
  ): Promise<string> {
    const {
      includeImport = true,
      style = 'basic',
      typescript = true,
      withComments = false,
      indentation = 2
    } = options

    const component = await this.discoveryService.getComponentByName(componentName)
    if (!component) {
      throw new Error(`Component not found: ${componentName}`)
    }

    const componentProps = await this.discoveryService.getComponentProps(componentName)
    const variants = await this.discoveryService.getComponentVariants(componentName)

    const generated = await this.generateCode(
      component.name,
      component.exports,
      componentProps,
      variants,
      props,
      options
    )

    if (includeImport) {
      return generated.complete
    }

    return generated.usage
  }

  /**
   * Generate multiple component composition
   */
  async generateComposition(
    components: Array<{ name: string; props?: Record<string, any> }>,
    options: CodeGenOptions = {}
  ): Promise<string> {
    const imports = new Set<string>()
    const usageLines: string[] = []

    for (const { name, props = {} } of components) {
      const component = await this.discoveryService.getComponentByName(name)
      if (!component) {
        continue
      }

      // Collect imports
      const primaryExport = this.getPrimaryExport(component.exports)
      imports.add(primaryExport)

      // Generate usage
      const usage = await this.generateComponentUsage(name, props, {
        ...options,
        includeImport: false
      })
      usageLines.push(usage)
    }

    const importStatement = this.generateImportStatement(Array.from(imports))
    const indent = ' '.repeat(options.indentation || 2)
    
    return `${importStatement}\n\nfunction MyComponent() {\n${indent}return (\n${indent}  <div>\n${usageLines.map(line => `${indent}    ${line}`).join('\n')}\n${indent}  </div>\n${indent})\n}`
  }

  /**
   * Generate form with multiple components
   */
  async generateForm(
    fields: Array<{
      type: 'input' | 'select' | 'checkbox' | 'textarea' | 'button'
      name: string
      label?: string
      placeholder?: string
      required?: boolean
      options?: string[] // for select
    }>,
    options: CodeGenOptions = {}
  ): Promise<string> {
    const imports = new Set(['Form', 'FormField', 'FormItem', 'FormLabel', 'FormControl', 'FormMessage'])
    const fieldElements: string[] = []
    const indent = ' '.repeat(options.indentation || 2)

    for (const field of fields) {
      let componentName: string
      let componentProps: Record<string, any> = {}

      switch (field.type) {
        case 'input':
          componentName = 'Input'
          componentProps = {
            placeholder: field.placeholder || `Enter ${field.label || field.name}`
          }
          break
        case 'select':
          componentName = 'Select'
          componentProps = {}
          break
        case 'checkbox':
          componentName = 'Checkbox'
          componentProps = {}
          break
        case 'textarea':
          componentName = 'Textarea'
          componentProps = {
            placeholder: field.placeholder || `Enter ${field.label || field.name}`
          }
          break
        case 'button':
          componentName = 'Button'
          componentProps = { type: 'submit' }
          break
        default:
          continue
      }

      imports.add(componentName)

      if (field.type === 'button') {
        fieldElements.push(`${indent}    <${componentName} type="submit">\n${indent}      ${field.label || 'Submit'}\n${indent}    </${componentName}>`)
      } else {
        const propsString = Object.entries(componentProps)
          .map(([key, value]) => `${key}="${value}"`)
          .join(' ')

        fieldElements.push(`${indent}    <FormField
${indent}      name="${field.name}"
${indent}      render={({ field }) => (
${indent}        <FormItem>
${indent}          <FormLabel>${field.label || field.name}</FormLabel>
${indent}          <FormControl>
${indent}            <${componentName} ${propsString} {...field} />
${indent}          </FormControl>
${indent}          <FormMessage />
${indent}        </FormItem>
${indent}      )}
${indent}    />`)
      }
    }

    const importStatement = this.generateImportStatement(Array.from(imports))
    
    return `${importStatement}

function MyForm() {
${indent}return (
${indent}  <Form>
${fieldElements.join('\n\n')}
${indent}  </Form>
${indent})
}`
  }

  /**
   * Generate usage examples based on component props
   */
  async generateExamples(componentName: string): Promise<Array<{ title: string; code: string; description: string }>> {
    const component = await this.discoveryService.getComponentByName(componentName)
    if (!component) {
      throw new Error(`Component not found: ${componentName}`)
    }

    const props = await this.discoveryService.getComponentProps(componentName)
    const variants = await this.discoveryService.getComponentVariants(componentName)
    const examples: Array<{ title: string; code: string; description: string }> = []

    // Basic example
    const basicCode = await this.generateComponentUsage(componentName, {}, { style: 'basic' })
    examples.push({
      title: 'Basic Usage',
      description: `Basic usage of the ${componentName} component`,
      code: basicCode
    })

    // Variant examples
    for (const variant of variants) {
      if (variant.options.length > 1) {
        for (const option of variant.options.slice(0, 3)) { // Limit to first 3 options
          const variantProps = { [variant.name]: option.value }
          const variantCode = await this.generateComponentUsage(componentName, variantProps, { style: 'basic' })
          examples.push({
            title: `${variant.name}: ${option.value}`,
            description: `${componentName} with ${variant.name} set to "${option.value}"`,
            code: variantCode
          })
        }
      }
    }

    // Advanced example with multiple props
    if (props.length > 2) {
      const advancedProps: Record<string, any> = {}
      
      // Add some common props
      for (const prop of props.slice(0, 3)) {
        if (prop.name === 'disabled') {
          advancedProps[prop.name] = false
        } else if (prop.name === 'loading') {
          advancedProps[prop.name] = true
        } else if (prop.type.includes('string')) {
          advancedProps[prop.name] = `"example ${prop.name}"`
        } else if (prop.type.includes('boolean')) {
          advancedProps[prop.name] = true
        }
      }

      if (Object.keys(advancedProps).length > 0) {
        const advancedCode = await this.generateComponentUsage(componentName, advancedProps, { style: 'advanced' })
        examples.push({
          title: 'Advanced Usage',
          description: `${componentName} with multiple props configured`,
          code: advancedCode
        })
      }
    }

    return examples
  }

  /**
   * Generate the complete code structure
   */
  private async generateCode(
    componentName: string,
    exports: string[],
    props: ComponentProp[],
    variants: ComponentVariant[],
    userProps: Record<string, any>,
    options: CodeGenOptions
  ): Promise<GeneratedCode> {
    const primaryExport = this.getPrimaryExport(exports)
    const imports = this.generateImportStatement([primaryExport, ...this.getAdditionalExports(exports, userProps)])
    
    let usage: string
    
    switch (options.style) {
      case 'advanced':
        usage = this.generateAdvancedUsage(primaryExport, props, variants, userProps, options)
        break
      case 'example':
        usage = this.generateExampleUsage(primaryExport, props, variants, userProps, options)
        break
      default:
        usage = this.generateBasicUsage(primaryExport, props, userProps, options)
    }

    return {
      imports,
      usage,
      complete: options.includeImport ? `${imports}\n\n${usage}` : usage
    }
  }

  /**
   * Generate basic component usage
   */
  private generateBasicUsage(
    componentName: string,
    props: ComponentProp[],
    userProps: Record<string, any>,
    options: CodeGenOptions
  ): string {
    const hasChildren = props.some(prop => prop.name === 'children')
    const propString = this.generatePropsString(userProps, options)
    
    if (hasChildren && !userProps.children) {
      return `<${componentName}${propString}>\n  Content\n</${componentName}>`
    }
    
    if (userProps.children) {
      const children = typeof userProps.children === 'string' ? userProps.children : 'Content'
      const propsWithoutChildren = { ...userProps }
      delete propsWithoutChildren.children
      const propsString = this.generatePropsString(propsWithoutChildren, options)
      return `<${componentName}${propsString}>\n  ${children}\n</${componentName}>`
    }
    
    return `<${componentName}${propString} />`
  }

  /**
   * Generate advanced component usage with multiple props
   */
  private generateAdvancedUsage(
    componentName: string,
    props: ComponentProp[],
    variants: ComponentVariant[],
    userProps: Record<string, any>,
    options: CodeGenOptions
  ): string {
    const allProps = { ...userProps }
    
    // Add default variants if not specified
    for (const variant of variants) {
      if (!allProps[variant.name] && variant.defaultValue) {
        allProps[variant.name] = variant.defaultValue
      }
    }
    
    // Add some example props
    for (const prop of props.slice(0, 3)) {
      if (!allProps[prop.name] && prop.name !== 'children' && prop.name !== 'className') {
        if (prop.type.includes('string')) {
          allProps[prop.name] = `"example ${prop.name}"`
        } else if (prop.type.includes('boolean') && prop.name !== 'disabled') {
          allProps[prop.name] = true
        }
      }
    }
    
    return this.generateBasicUsage(componentName, props, allProps, options)
  }

  /**
   * Generate example usage with comments
   */
  private generateExampleUsage(
    componentName: string,
    props: ComponentProp[],
    variants: ComponentVariant[],
    userProps: Record<string, any>,
    options: CodeGenOptions
  ): string {
    const comments = options.withComments || true
    let code = ''
    
    if (comments) {
      code += `// Example usage of ${componentName}\n`
      if (variants.length > 0) {
        code += `// Available variants: ${variants.map(v => v.name).join(', ')}\n`
      }
      code += '\n'
    }
    
    code += this.generateAdvancedUsage(componentName, props, variants, userProps, options)
    
    return code
  }

  /**
   * Generate props string for JSX
   */
  private generatePropsString(props: Record<string, any>, options: CodeGenOptions): string {
    if (Object.keys(props).length === 0) {
      return ''
    }
    
    const propEntries = Object.entries(props)
    const propStrings = propEntries.map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? key : `${key}={false}`
      }
      
      if (typeof value === 'string') {
        // Remove quotes if already quoted
        const cleanValue = value.replace(/^"(.*)"$/, '$1')
        return `${key}="${cleanValue}"`
      }
      
      if (typeof value === 'number') {
        return `${key}={${value}}`
      }
      
      return `${key}={${JSON.stringify(value)}}`
    })
    
    if (propStrings.length === 1) {
      return ` ${propStrings[0]}`
    }
    
    const indent = ' '.repeat(options.indentation || 2)
    return `\n${propStrings.map(prop => `${indent}${prop}`).join('\n')}\n`
  }

  /**
   * Generate import statement
   */
  private generateImportStatement(exports: string[]): string {
    if (exports.length === 0) {
      return ''
    }
    
    const uniqueExports = [...new Set(exports)].filter(exp => 
      !exp.startsWith('type ') && !exp.includes('Props')
    )
    
    if (uniqueExports.length === 1) {
      return `import { ${uniqueExports[0]} } from "@rs-kit/ui-kit"`
    }
    
    return `import {\n  ${uniqueExports.join(',\n  ')}\n} from "@rs-kit/ui-kit"`
  }

  /**
   * Get primary export from exports list
   */
  private getPrimaryExport(exports: string[]): string {
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
   * Get additional exports that might be needed
   */
  private getAdditionalExports(exports: string[], userProps: Record<string, any>): string[] {
    const additional = []
    
    // Add variant exports if variant props are used
    for (const exp of exports) {
      if (exp.includes('Variants') || exp.includes('variants')) {
        for (const propName in userProps) {
          if (propName === 'variant' || propName === 'size') {
            additional.push(exp)
            break
          }
        }
      }
    }
    
    return additional
  }
}

// CodeGenerationService is already exported in the class declaration