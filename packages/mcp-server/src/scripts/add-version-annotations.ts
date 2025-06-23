#!/usr/bin/env tsx
/**
 * Add Version Annotations Script
 * 
 * Automatically adds version annotations to components that don't have them
 */

import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { getComponentFiles, extractComponentName } from '../utils/file-utils.js'
import { generateVersionAnnotation, addVersionToContent } from '../extractors/version-extractor.js'

interface ComponentInfo {
  filePath: string
  name: string
  hasAnnotation: boolean
  currentContent: string
}

async function main() {
  const args = process.argv.slice(2)
  const options = {
    dryRun: args.includes('--dry-run'),
    force: args.includes('--force'),
    verbose: args.includes('--verbose')
  }

  try {
    const projectRoot = resolve(process.cwd())
    const componentFiles = await getComponentFiles(projectRoot)
    
    console.log(`🔍 Found ${componentFiles.length} component files`)
    
    const componentsInfo: ComponentInfo[] = []
    
    // Analyze each component
    for (const filePath of componentFiles) {
      try {
        const content = await readFile(filePath, 'utf-8')
        const name = extractComponentName(filePath)
        const hasAnnotation = hasVersionAnnotation(content)
        
        componentsInfo.push({
          filePath,
          name,
          hasAnnotation,
          currentContent: content
        })
        
        if (options.verbose) {
          console.log(`  📄 ${name}: ${hasAnnotation ? '✅ Has annotation' : '❌ Missing annotation'}`)
        }
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error)
      }
    }
    
    // Filter components that need annotations
    const needsAnnotation = componentsInfo.filter(comp => 
      !comp.hasAnnotation || options.force
    )
    
    console.log(`\n📝 Components needing annotations: ${needsAnnotation.length}`)
    
    if (needsAnnotation.length === 0) {
      console.log('✅ All components already have version annotations!')
      return
    }
    
    if (options.dryRun) {
      console.log('\n🔍 DRY RUN - Components that would be updated:')
      needsAnnotation.forEach(comp => {
        console.log(`  • ${comp.name} (${comp.filePath})`)
      })
      return
    }
    
    // Add annotations
    let updateCount = 0
    let errorCount = 0
    
    for (const comp of needsAnnotation) {
      try {
        const description = generateComponentDescription(comp.name)
        const annotation = `/**
 * @component ${comp.name}
 * @version 1.0.0
 * @lastModified 2025-06-20
 * @description ${description}
 * @status stable
 */`
        
        const updatedContent = addVersionAnnotationToContent(comp.currentContent, annotation)
        
        await writeFile(comp.filePath, updatedContent, 'utf-8')
        updateCount++
        
        if (options.verbose) {
          console.log(`  ✅ Updated ${comp.name}`)
        }
      } catch (error) {
        errorCount++
        console.error(`  ❌ Error updating ${comp.name}:`, error)
      }
    }
    
    console.log(`\n📊 Update Summary:`)
    console.log(`  • Updated: ${updateCount} components`)
    if (errorCount > 0) {
      console.log(`  • Errors: ${errorCount} components`)
    }
    
    console.log(`\n✅ Version annotations added successfully!`)
    console.log(`💡 Next step: Run 'pnpm docs:extract' to update the version registry`)
    
  } catch (error) {
    console.error('❌ Error adding version annotations:', error)
    process.exit(1)
  }
}

function hasVersionAnnotation(content: string): boolean {
  return /@version\s+[\d.]+/i.test(content) || /@component\s+\w+/i.test(content)
}

function addVersionAnnotationToContent(content: string, annotation: string): string {
  // Find the best place to insert the annotation
  const lines = content.split('\n')
  let insertIndex = 0
  
  // Skip any existing comments or license headers
  while (insertIndex < lines.length) {
    const line = lines[insertIndex].trim()
    if (line.startsWith('/*') || line.startsWith('*') || line.startsWith('//') || line === '') {
      insertIndex++
    } else if (line.startsWith('import') || line.startsWith('export')) {
      break
    } else {
      insertIndex++
    }
  }
  
  // Insert the annotation
  lines.splice(insertIndex, 0, annotation, '')
  return lines.join('\n')
}

function generateComponentDescription(componentName: string): string {
  const descriptions: Record<string, string> = {
    'Accordion': 'A collapsible content container with multiple panels',
    'Alert': 'A feedback component for displaying important messages',
    'AlertDialog': 'A modal dialog for critical confirmations and alerts',
    'AspectRatio': 'A container that maintains a specific aspect ratio',
    'Avatar': 'A user profile image with fallback initials',
    'Badge': 'A small status indicator or label component',
    'Breadcrumb': 'Navigation component showing the current page hierarchy',
    'Button': 'A customizable button component with multiple variants',
    'Calendar': 'A date picker and calendar interface component',
    'Card': 'A flexible container with header, content, and footer sections',
    'Carousel': 'A slideshow component for displaying multiple items',
    'Chart': 'Recharts-based chart components for data visualization',
    'Checkbox': 'A binary choice input component',
    'Collapsible': 'A component that can be expanded or collapsed',
    'Command': 'A command palette and search interface component',
    'ContextMenu': 'A right-click context menu component',
    'Dialog': 'A modal dialog component for focused interactions',
    'Drawer': 'A slide-out panel component',
    'DropdownMenu': 'A dropdown menu with multiple action items',
    'Form': 'Form components with validation and field management',
    'HoverCard': 'A floating card that appears on hover',
    'Input': 'A text input component with various styling options',
    'InputOTP': 'A one-time password input component',
    'Label': 'A form label component with accessibility features',
    'Menubar': 'A horizontal menu bar with dropdown menus',
    'NavigationMenu': 'A navigation menu with nested items',
    'Pagination': 'A pagination component for navigating through pages',
    'Popover': 'A floating content container component',
    'Progress': 'A progress indicator component',
    'RadioGroup': 'A group of radio button options',
    'Resizable': 'Resizable panel components with drag handles',
    'ScrollArea': 'A custom scrollable container',
    'Select': 'A dropdown selection component',
    'Separator': 'A visual divider component',
    'Sheet': 'A slide-out sheet component',
    'Sidebar': 'A collapsible sidebar navigation component',
    'Skeleton': 'A placeholder component for loading states',
    'Slider': 'A range input slider component',
    'Switch': 'A toggle switch component',
    'Table': 'A data table component with sorting and styling',
    'Tabs': 'A tabbed interface component',
    'Textarea': 'A multi-line text input component',
    'Toast': 'A notification toast component',
    'Toggle': 'A toggle button component',
    'ToggleGroup': 'A group of toggle buttons',
    'Tooltip': 'A floating tooltip component',
    'Toaster': 'A toast notification manager component'
  }
  
  return descriptions[componentName] || `${componentName} component for the UI library`
}

// Handle CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { main as addVersionAnnotations }