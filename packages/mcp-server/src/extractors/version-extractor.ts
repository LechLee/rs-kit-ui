/**
 * Version Extractor
 * 
 * Extracts version information from component files using multiple strategies
 */

import { readFileContent } from '../utils/file-utils.js'
import type { ComponentVersion } from '../schemas/version-registry.js'

/**
 * Extract version information from a component file
 */
export async function extractComponentVersion(filePath: string): Promise<ComponentVersion | null> {
  try {
    const content = await readFileContent(filePath)
    const name = extractComponentNameFromFile(content, filePath)
    
    if (!name) {
      return null
    }

    const version = extractVersionFromContent(content)
    const lastModified = extractLastModifiedFromContent(content)
    const contentHash = await import('crypto').then(crypto => 
      crypto.createHash('sha256').update(content).digest('hex')
    )
    const size = Buffer.byteLength(content, 'utf-8')
    const exports = extractExportsFromContent(content)
    const status = extractStatusFromContent(content)

    return {
      name,
      version: version || '1.0.0', // Default version if not found
      lastModified: lastModified || new Date().toISOString(),
      filePath,
      contentHash,
      size,
      exports,
      status: status || 'stable'
    }
  } catch (error) {
    console.error(`Failed to extract version from ${filePath}:`, error)
    return null
  }
}

/**
 * Extract component name from file content and path
 */
function extractComponentNameFromFile(content: string, filePath: string): string | null {
  // Try to find component declaration
  const componentMatches = [
    // React.forwardRef patterns
    /export\s+const\s+(\w+)\s*=\s*React\.forwardRef/g,
    /const\s+(\w+)\s*=\s*React\.forwardRef/g,
    
    // Function component patterns
    /export\s+(?:default\s+)?function\s+(\w+)/g,
    /function\s+(\w+)/g,
    
    // Arrow function patterns
    /export\s+const\s+(\w+)\s*=\s*\(/g,
    /const\s+(\w+)\s*=\s*\(/g,
    
    // Class component patterns
    /export\s+(?:default\s+)?class\s+(\w+)/g,
    /class\s+(\w+)/g
  ]

  for (const regex of componentMatches) {
    const matches = Array.from(content.matchAll(regex))
    for (const match of matches) {
      const name = match[1]
      if (name && isComponentName(name)) {
        return name
      }
    }
  }

  // Fallback to filename
  const fileName = filePath.split('/').pop()?.replace(/\.(tsx?|jsx?)$/, '')
  if (fileName && isComponentName(fileName)) {
    return fileName.charAt(0).toUpperCase() + fileName.slice(1)
  }

  return null
}

/**
 * Check if a name looks like a component name
 */
function isComponentName(name: string): boolean {
  // Component names should start with uppercase and not be generic terms
  const genericTerms = ['React', 'Component', 'Element', 'Props', 'FC', 'forwardRef']
  return /^[A-Z]/.test(name) && !genericTerms.includes(name) && name.length > 1
}

/**
 * Extract version from file content using multiple strategies
 */
function extractVersionFromContent(content: string): string | null {
  // Strategy 1: JSDoc @version tag
  const jsdocVersionMatch = content.match(/@version\s+([^\s\n]+)/i)
  if (jsdocVersionMatch) {
    return jsdocVersionMatch[1]
  }

  // Strategy 2: Export version constant
  const exportVersionMatch = content.match(/export\s+const\s+\w+_VERSION\s*=\s*['"]([\d.]+)['"]/i)
  if (exportVersionMatch) {
    return exportVersionMatch[1]
  }

  // Strategy 3: Component.version property
  const componentVersionMatch = content.match(/\.version\s*=\s*['"]([\d.]+)['"]/i)
  if (componentVersionMatch) {
    return componentVersionMatch[1]
  }

  // Strategy 4: Package.json style version in comments
  const commentVersionMatch = content.match(/\/\*\*?[\s\S]*?version[:\s]+([^\s\n*]+)/i)
  if (commentVersionMatch) {
    const version = commentVersionMatch[1].replace(/[*\/]/g, '').trim()
    if (/^\d+\.\d+\.\d+/.test(version)) {
      return version
    }
  }

  return null
}

/**
 * Extract last modified date from file content
 */
function extractLastModifiedFromContent(content: string): string | null {
  // Strategy 1: JSDoc @lastModified tag
  const jsdocMatch = content.match(/@lastModified\s+([^\s\n]+)/i)
  if (jsdocMatch) {
    return jsdocMatch[1]
  }

  // Strategy 2: Comment with date
  const commentMatch = content.match(/\/\*\*?[\s\S]*?(?:last.?modified|updated)[:\s]+([^\s\n*]+)/i)
  if (commentMatch) {
    const date = commentMatch[1].replace(/[*\/]/g, '').trim()
    if (isValidDate(date)) {
      return date
    }
  }

  return null
}

/**
 * Extract exports from file content
 */
function extractExportsFromContent(content: string): string[] {
  const exports: string[] = []
  
  // Named exports
  const namedExportMatches = content.matchAll(/export\s+(?:const|function|class|interface|type)\s+(\w+)/g)
  for (const match of namedExportMatches) {
    exports.push(match[1])
  }

  // Export statements
  const exportStatementMatches = content.matchAll(/export\s*{\s*([^}]+)\s*}/g)
  for (const match of exportStatementMatches) {
    const exportList = match[1].split(',').map(item => item.trim().split(/\s+as\s+/)[0].trim())
    exports.push(...exportList)
  }

  // Default exports
  const defaultExportMatch = content.match(/export\s+default\s+(\w+)/)
  if (defaultExportMatch) {
    exports.push(`default(${defaultExportMatch[1]})`)
  }

  return [...new Set(exports)].filter(Boolean)
}

/**
 * Extract component status from file content
 */
function extractStatusFromContent(content: string): 'stable' | 'beta' | 'alpha' | 'deprecated' | 'experimental' | null {
  const statusMatch = content.match(/@status\s+(stable|beta|alpha|deprecated|experimental)/i)
  if (statusMatch) {
    return statusMatch[1].toLowerCase() as any
  }

  // Check for deprecation indicators
  if (/@deprecated/i.test(content)) {
    return 'deprecated'
  }

  // Check for experimental indicators
  if (/@experimental/i.test(content) || /experimental/i.test(content)) {
    return 'experimental'
  }

  return null
}

/**
 * Check if a string is a valid date
 */
function isValidDate(dateString: string): boolean {
  return !isNaN(Date.parse(dateString))
}

/**
 * Generate version annotation for a component
 */
export function generateVersionAnnotation(name: string, version: string = '1.0.0'): string {
  const timestamp = new Date().toISOString().split('T')[0]
  
  return `/**
 * @component ${name}
 * @version ${version}
 * @lastModified ${timestamp}
 * @description ${name} component
 */`
}

/**
 * Add version annotation to component file
 */
export function addVersionToContent(content: string, name: string, version: string = '1.0.0'): string {
  const annotation = generateVersionAnnotation(name, version)
  
  // Find the best place to insert the annotation
  const exportMatch = content.match(/(export\s+(?:const|function|default\s+(?:function|class))\s+\w+)/m)
  
  if (exportMatch) {
    const insertIndex = content.indexOf(exportMatch[1])
    return content.slice(0, insertIndex) + annotation + '\n' + content.slice(insertIndex)
  }
  
  // If no good insertion point found, add at the top after imports
  const importEndMatch = content.lastIndexOf('\n', content.lastIndexOf('import '))
  if (importEndMatch !== -1) {
    const insertIndex = importEndMatch + 1
    return content.slice(0, insertIndex) + '\n' + annotation + '\n' + content.slice(insertIndex)
  }
  
  // Last resort: add at the very beginning
  return annotation + '\n\n' + content
}