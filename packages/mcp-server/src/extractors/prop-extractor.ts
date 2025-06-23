/**
 * Prop Extractor
 * 
 * Extracts TypeScript props and interfaces from component files
 */

import { readFileContent } from '../utils/file-utils.js'
import type { ComponentProp, ComponentVariant, VariantOption } from '../schemas/documentation.js'

/**
 * Extract props from a component file
 */
export async function extractComponentProps(filePath: string): Promise<ComponentProp[]> {
  try {
    const content = await readFileContent(filePath)
    const props: ComponentProp[] = []
    
    // Extract interface definitions
    const interfaceProps = extractInterfaceProps(content)
    props.push(...interfaceProps)
    
    // Extract type definitions
    const typeProps = extractTypeProps(content)
    props.push(...typeProps)
    
    return props
  } catch (error) {
    console.error(`Failed to extract props from ${filePath}:`, error)
    return []
  }
}

/**
 * Extract component variants from cva calls
 */
export async function extractComponentVariants(filePath: string): Promise<ComponentVariant[]> {
  try {
    const content = await readFileContent(filePath)
    return extractCvaVariants(content)
  } catch (error) {
    console.error(`Failed to extract variants from ${filePath}:`, error)
    return []
  }
}

/**
 * Extract props from interface definitions
 */
function extractInterfaceProps(content: string): ComponentProp[] {
  const props: ComponentProp[] = []
  
  // Match interface definitions with proper brace matching
  const interfacePattern = /interface\s+(\w+Props?)\s*(?:extends\s+[^{]+)?\s*\{/g
  let match
  
  while ((match = interfacePattern.exec(content)) !== null) {
    const interfaceName = match[1]
    const startIndex = match.index + match[0].length
    
    // Skip generic or base interfaces
    if (interfaceName.includes('<') || interfaceName === 'Props') {
      continue
    }
    
    // Find the matching closing brace
    const interfaceBody = extractBraceContent(content, startIndex - 1)
    if (interfaceBody) {
      const interfaceProps = parsePropsFromBody(interfaceBody)
      props.push(...interfaceProps)
    }
  }
  
  return props
}

/**
 * Extract props from type definitions
 */
function extractTypeProps(content: string): ComponentProp[] {
  const props: ComponentProp[] = []
  
  // Match type definitions (e.g., type ButtonProps = ...)
  const typeMatches = content.matchAll(/(?:export\s+)?type\s+(\w+Props?)\s*=\s*([^;]+);?/g)
  
  for (const match of typeMatches) {
    const typeName = match[1]
    const typeDefinition = match[2]
    
    // Skip generic types
    if (typeName.includes('<')) {
      continue
    }
    
    // Handle object types
    if (typeDefinition.includes('{')) {
      const objectMatch = typeDefinition.match(/\{([^}]+)\}/)
      if (objectMatch) {
        const typeProps = parsePropsFromBody(objectMatch[1])
        props.push(...typeProps)
      }
    }
  }
  
  return props
}

/**
 * Parse props from interface/type body
 */
function parsePropsFromBody(body: string): ComponentProp[] {
  const props: ComponentProp[] = []
  
  // Clean up the body - remove comments and normalize whitespace
  const cleanBody = body
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    .replace(/\/\/.*$/gm, '') // Remove line comments
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
  
  // Split by semicolons and commas, handling nested types
  const propLines = splitPropsBody(cleanBody)
  
  for (const line of propLines) {
    const prop = parsePropLine(line.trim())
    if (prop) {
      props.push(prop)
    }
  }
  
  return props
}

/**
 * Split props body handling nested types
 */
function splitPropsBody(body: string): string[] {
  const lines: string[] = []
  let current = ''
  let depth = 0
  let inString = false
  let stringChar = ''
  
  for (let i = 0; i < body.length; i++) {
    const char = body[i]
    const prevChar = i > 0 ? body[i - 1] : ''
    
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = true
      stringChar = char
    } else if (inString && char === stringChar && prevChar !== '\\') {
      inString = false
      stringChar = ''
    }
    
    if (!inString) {
      if (char === '{' || char === '(' || char === '[') {
        depth++
      } else if (char === '}' || char === ')' || char === ']') {
        depth--
      } else if ((char === ';' || char === ',') && depth === 0) {
        if (current.trim()) {
          lines.push(current.trim())
        }
        current = ''
        continue
      }
    }
    
    current += char
  }
  
  if (current.trim()) {
    lines.push(current.trim())
  }
  
  return lines
}

/**
 * Parse individual prop line
 */
function parsePropLine(line: string): ComponentProp | null {
  // Skip empty lines or lines that don't look like props
  if (!line || line.length < 2) {
    return null
  }
  
  // Match prop patterns: name?: type | name: type
  const propMatch = line.match(/^(\w+)(\?)?:\s*(.+)$/)
  if (!propMatch) {
    return null
  }
  
  const name = propMatch[1]
  const optional = propMatch[2] === '?'
  const typeDefinition = propMatch[3]
  
  // Extract default value if present
  let type = typeDefinition
  let defaultValue: string | undefined
  
  const defaultMatch = type.match(/^(.+?)\s*\/\*\s*@default\s+(.+?)\s*\*\//)
  if (defaultMatch) {
    type = defaultMatch[1].trim()
    defaultValue = defaultMatch[2].trim()
  }
  
  // Generate description from JSDoc comments (if we had them)
  const description = generatePropDescription(name, type)
  
  return {
    name,
    type: cleanType(type),
    description,
    required: !optional,
    defaultValue
  }
}

/**
 * Clean and normalize type definitions
 */
function cleanType(type: string): string {
  return type
    .replace(/\s+/g, ' ')
    .replace(/\|\s*undefined/g, '')
    .replace(/React\.(ComponentProps|HTMLAttributes|ButtonHTMLAttributes|InputHTMLAttributes)<[^>]+>/g, (match) => {
      if (match.includes('Button')) return 'ButtonHTMLAttributes'
      if (match.includes('Input')) return 'InputHTMLAttributes'
      return 'HTMLAttributes'
    })
    .trim()
}

/**
 * Generate description for a prop based on its name and type
 */
function generatePropDescription(name: string, type: string): string {
  const descriptions: Record<string, string> = {
    'className': 'Additional CSS class names to apply',
    'children': 'The content to display inside the component',
    'asChild': 'Render as a different element type',
    'disabled': 'Whether the component is disabled',
    'variant': 'The visual variant of the component',
    'size': 'The size variant of the component',
    'onClick': 'Event handler for click events',
    'onChange': 'Event handler for change events',
    'onSubmit': 'Event handler for form submission',
    'placeholder': 'Placeholder text to display',
    'value': 'The current value of the component',
    'defaultValue': 'The default value of the component',
    'name': 'The name attribute for form controls',
    'id': 'The unique identifier for the component',
    'type': 'The type of the component or input',
    'required': 'Whether the field is required',
    'autoFocus': 'Whether to focus the component on mount',
    'readOnly': 'Whether the component is read-only',
    'loading': 'Whether to show a loading state',
    'error': 'Whether to show an error state',
    'success': 'Whether to show a success state'
  }
  
  if (descriptions[name]) {
    return descriptions[name]
  }
  
  // Generate based on type
  if (type.includes('boolean')) {
    return `Whether to enable ${name}`
  }
  
  if (type.includes('string')) {
    return `The ${name} text`
  }
  
  if (type.includes('number')) {
    return `The ${name} value`
  }
  
  if (type.includes('() =>') || type.includes('function')) {
    return `Callback function for ${name}`
  }
  
  return `The ${name} prop`
}

/**
 * Extract brace content starting from an opening brace
 */
function extractBraceContent(content: string, startIndex: number): string | null {
  let depth = 0
  let inString = false
  let stringChar = ''
  let result = ''
  
  for (let i = startIndex; i < content.length; i++) {
    const char = content[i]
    const prevChar = i > 0 ? content[i - 1] : ''
    
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = true
      stringChar = char
    } else if (inString && char === stringChar && prevChar !== '\\') {
      inString = false
      stringChar = ''
    }
    
    if (!inString) {
      if (char === '{') {
        depth++
      } else if (char === '}') {
        depth--
        if (depth === 0) {
          return result
        }
      }
    }
    
    if (depth > 0) {
      result += char
    }
  }
  
  return null
}

/**
 * Extract cva variants from content
 */
function extractCvaVariants(content: string): ComponentVariant[] {
  const variants: ComponentVariant[] = []
  
  // Find cva calls with proper brace matching
  const cvaPattern = /cva\s*\(/g
  let match
  
  while ((match = cvaPattern.exec(content)) !== null) {
    const startIndex = match.index + match[0].length
    
    // Find the first argument (base classes) and skip it
    let depth = 1
    let i = startIndex
    let inString = false
    let stringChar = ''
    
    // Skip first argument
    while (i < content.length && depth > 0) {
      const char = content[i]
      const prevChar = i > 0 ? content[i - 1] : ''
      
      if (!inString && (char === '"' || char === "'" || char === '`')) {
        inString = true
        stringChar = char
      } else if (inString && char === stringChar && prevChar !== '\\') {
        inString = false
        stringChar = ''
      }
      
      if (!inString) {
        if (char === '(' || char === '{' || char === '[') {
          depth++
        } else if (char === ')' || char === '}' || char === ']') {
          depth--
        } else if (char === ',' && depth === 1) {
          // Found the separator, now look for the config object
          i++
          break
        }
      }
      i++
    }
    
    // Skip whitespace
    while (i < content.length && /\s/.test(content[i])) {
      i++
    }
    
    // Check if we have a config object
    if (i < content.length && content[i] === '{') {
      const configBody = extractBraceContent(content, i)
      if (configBody) {
        const variantProps = parseVariantsFromConfig(configBody)
        variants.push(...variantProps)
      }
    }
  }
  
  return variants
}

/**
 * Parse variants from cva config body
 */
function parseVariantsFromConfig(configBody: string): ComponentVariant[] {
  const variants: ComponentVariant[] = []
  
  // Look for variants object
  const variantsMatch = configBody.match(/variants:\s*\{/)
  if (!variantsMatch) return variants
  
  const variantsStartIndex = variantsMatch.index! + variantsMatch[0].length - 1
  const variantsBody = extractBraceContent(configBody, variantsStartIndex)
  
  if (variantsBody) {
    const variantProps = parseVariantsFromBody(variantsBody)
    variants.push(...variantProps)
  }
  
  return variants
}

/**
 * Parse variants from cva variants body
 */
function parseVariantsFromBody(body: string): ComponentVariant[] {
  const variants: ComponentVariant[] = []
  
  // Split by variant names (look for property: { pattern)
  const variantMatches = body.matchAll(/(\w+):\s*\{([^}]+)\}/g)
  
  for (const match of variantMatches) {
    const variantName = match[1]
    const variantBody = match[2]
    
    const options = parseVariantOptions(variantBody)
    
    variants.push({
      name: variantName,
      type: 'string',
      options,
      defaultValue: options.find(opt => opt.value === 'default')?.value
    })
  }
  
  return variants
}

/**
 * Parse variant options from variant body
 */
function parseVariantOptions(body: string): VariantOption[] {
  const options: VariantOption[] = []
  
  // Match key: value pairs
  const optionMatches = body.matchAll(/(\w+):\s*['"](.*?)['"](?:\s*,|\s*$)/g)
  
  for (const match of optionMatches) {
    const value = match[1]
    const description = generateVariantDescription(value)
    
    options.push({
      value,
      description
    })
  }
  
  return options
}

/**
 * Generate description for variant option
 */
function generateVariantDescription(value: string): string {
  const descriptions: Record<string, string> = {
    'default': 'Default styling',
    'primary': 'Primary styling with emphasis',
    'secondary': 'Secondary styling with less emphasis',
    'destructive': 'Destructive styling for dangerous actions',
    'outline': 'Outlined styling with border',
    'ghost': 'Subtle styling with no background',
    'link': 'Link styling with underline',
    'sm': 'Small size variant',
    'md': 'Medium size variant',
    'lg': 'Large size variant',
    'xl': 'Extra large size variant',
    'icon': 'Icon-only variant'
  }
  
  return descriptions[value] || `${value} variant`
}

export {
  extractInterfaceProps,
  extractTypeProps,
  extractCvaVariants,
  parsePropsFromBody,
  parsePropLine,
  cleanType,
  generatePropDescription
}