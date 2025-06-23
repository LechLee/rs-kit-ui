/**
 * File Utilities
 * 
 * Utilities for file operations and content processing
 */

import { createHash } from 'crypto'
import { readFile, stat } from 'fs/promises'
import { glob } from 'glob'
import { basename, extname, relative } from 'path'

/**
 * Calculate hash of file content
 */
export async function calculateFileHash(filePath: string): Promise<string> {
  const content = await readFile(filePath, 'utf-8')
  return createHash('sha256').update(content).digest('hex')
}

/**
 * Get file size in bytes
 */
export async function getFileSize(filePath: string): Promise<number> {
  const stats = await stat(filePath)
  return stats.size
}

/**
 * Get file modification time
 */
export async function getFileModificationTime(filePath: string): Promise<Date> {
  const stats = await stat(filePath)
  return stats.mtime
}

/**
 * Get all component files in the ui-kit package
 */
export async function getComponentFiles(rootPath: string): Promise<string[]> {
  const patterns = [
    `${rootPath}/packages/ui-kit/components/ui/*.tsx`,
    `${rootPath}/packages/ui-kit/components/custom/*.tsx`,
    `${rootPath}/packages/ui-kit/hooks/*.ts`,
    `${rootPath}/packages/ui-kit/lib/*.ts`
  ]
  
  const files: string[] = []
  for (const pattern of patterns) {
    const matches = await glob(pattern)
    files.push(...matches)
  }
  
  return files
}

/**
 * Get all playground sample files
 */
export async function getSampleFiles(rootPath: string): Promise<string[]> {
  const pattern = `${rootPath}/packages/playground/src/samples/*.tsx`
  return await glob(pattern)
}

/**
 * Extract component name from file path
 */
export function extractComponentName(filePath: string): string {
  const fileName = basename(filePath, extname(filePath))
  
  // Handle special cases
  if (fileName.includes('.sample')) {
    return fileName.replace('.sample', '')
  }
  
  // Convert kebab-case to PascalCase
  return fileName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

/**
 * Get relative path from project root
 */
export function getRelativePath(filePath: string, rootPath: string): string {
  return relative(rootPath, filePath)
}

/**
 * Check if file is a component file
 */
export function isComponentFile(filePath: string): boolean {
  return filePath.includes('/components/ui/') || 
         filePath.includes('/components/custom/') ||
         filePath.includes('/hooks/') ||
         filePath.includes('/lib/')
}

/**
 * Check if file is a sample file
 */
export function isSampleFile(filePath: string): boolean {
  return filePath.includes('/samples/') && filePath.endsWith('.sample.tsx')
}

/**
 * Get component category from file path
 */
export function getComponentCategory(filePath: string): string {
  if (filePath.includes('/components/ui/')) return 'ui'
  if (filePath.includes('/components/custom/')) return 'custom'
  if (filePath.includes('/hooks/')) return 'hooks'
  if (filePath.includes('/lib/')) return 'utilities'
  return 'unknown'
}

/**
 * Read file content safely
 */
export async function readFileContent(filePath: string): Promise<string> {
  try {
    return await readFile(filePath, 'utf-8')
  } catch (error) {
    throw new Error(`Failed to read file ${filePath}: ${error}`)
  }
}

/**
 * Check if file exists and is readable
 */
export async function isFileAccessible(filePath: string): Promise<boolean> {
  try {
    await readFile(filePath, 'utf-8')
    return true
  } catch {
    return false
  }
}