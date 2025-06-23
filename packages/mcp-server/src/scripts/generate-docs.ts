#!/usr/bin/env tsx
/**
 * Generate Documentation Script
 * 
 * Generates documentation for components based on version tracking
 */

import { resolve } from 'path'
import { DocumentationGenerator } from '../generators/doc-generator.js'
import { VersionRegistryService } from '../services/version-registry.js'
import { getComponentFiles } from '../utils/file-utils.js'

interface CliOptions {
  component?: string
  outdatedOnly?: boolean
  all?: boolean
  verbose?: boolean
  output?: string
}

async function main() {
  const args = process.argv.slice(2)
  const options: CliOptions = {
    component: args.find(arg => arg.startsWith('--component='))?.split('=')[1],
    outdatedOnly: args.includes('--outdated-only'),
    all: args.includes('--all'),
    verbose: args.includes('--verbose'),
    output: args.find(arg => arg.startsWith('--output='))?.split('=')[1]
  }

  try {
    const projectRoot = resolve(process.cwd())
    const outputDir = options.output || 'docs/components'
    
    const generator = new DocumentationGenerator(projectRoot, outputDir)
    await generator.initialize()
    
    const registryService = new VersionRegistryService(projectRoot)
    await registryService.initialize()

    console.log('📚 Starting documentation generation...')

    let generatedFiles: string[] = []

    if (options.component) {
      // Generate for specific component
      await generateSpecificComponent(generator, registryService, options.component, options.verbose || false)
    } else if (options.outdatedOnly) {
      // Generate only for outdated components
      generatedFiles = await generator.generateOutdatedDocs()
    } else if (options.all) {
      // Generate for all components
      generatedFiles = await generateAllComponents(generator, projectRoot, options.verbose || false)
    } else {
      // Default: generate for outdated components
      console.log('🔍 Checking for outdated components...')
      const outdated = await registryService.getOutdatedComponents()
      
      if (outdated.length === 0) {
        console.log('✅ All documentation is up to date!')
        return
      }
      
      console.log(`📝 Found ${outdated.length} components needing documentation updates`)
      generatedFiles = await generator.generateOutdatedDocs()
    }

    // Show summary
    console.log(`\n📊 Documentation Generation Summary:`)
    console.log(`  • Generated: ${generatedFiles.length} files`)
    console.log(`  • Output directory: ${outputDir}`)
    
    if (options.verbose && generatedFiles.length > 0) {
      console.log(`  • Files:`)
      generatedFiles.forEach(file => console.log(`    - ${file}`))
    }

    // Show statistics
    const stats = await registryService.getStatistics()
    console.log(`\n📈 Documentation Statistics:`)
    console.log(`  • Total components: ${stats.total}`)
    console.log(`  • Documented: ${stats.documented}`)
    console.log(`  • Coverage: ${stats.coverage}%`)
    if (stats.outdated > 0) {
      console.log(`  • Still outdated: ${stats.outdated}`)
    }

    console.log(`\n✅ Documentation generation completed successfully!`)

  } catch (error) {
    console.error('❌ Error generating documentation:', error)
    process.exit(1)
  }
}

async function generateSpecificComponent(
  generator: DocumentationGenerator,
  registryService: VersionRegistryService,
  componentName: string,
  verbose: boolean
) {
  console.log(`📝 Generating documentation for ${componentName}...`)
  
  const entry = await registryService.getComponentEntry(componentName)
  if (!entry) {
    console.error(`❌ Component '${componentName}' not found in registry`)
    process.exit(1)
  }

  const outputPath = await generator.generateComponentDocs(entry.filePath)
  if (outputPath) {
    console.log(`✅ Generated documentation: ${outputPath}`)
  } else {
    console.error(`❌ Failed to generate documentation for ${componentName}`)
    process.exit(1)
  }
}

async function generateAllComponents(
  generator: DocumentationGenerator,
  projectRoot: string,
  verbose: boolean
): Promise<string[]> {
  console.log('📝 Generating documentation for all components...')
  
  const componentFiles = await getComponentFiles(projectRoot)
  const generatedFiles: string[] = []
  
  let successCount = 0
  let errorCount = 0

  for (const filePath of componentFiles) {
    if (verbose) {
      console.log(`  Processing ${filePath}...`)
    }
    
    try {
      const outputPath = await generator.generateComponentDocs(filePath)
      if (outputPath) {
        generatedFiles.push(outputPath)
        successCount++
        if (verbose) {
          console.log(`    ✅ Generated: ${outputPath}`)
        }
      }
    } catch (error) {
      errorCount++
      console.error(`    ❌ Error processing ${filePath}:`, error)
    }
  }

  console.log(`\n📊 Batch Generation Results:`)
  console.log(`  • Processed: ${componentFiles.length} files`)
  console.log(`  • Successful: ${successCount}`)
  if (errorCount > 0) {
    console.log(`  • Errors: ${errorCount}`)
  }

  return generatedFiles
}

// Show help
function showHelp() {
  console.log(`
📚 Documentation Generator

Usage:
  pnpm docs:generate [options]

Options:
  --component=<name>     Generate docs for specific component
  --outdated-only        Generate only for outdated components (default)
  --all                  Generate for all components
  --output=<dir>         Output directory (default: docs/components)
  --verbose              Show detailed output
  --help                 Show this help message

Examples:
  pnpm docs:generate                           # Generate outdated docs
  pnpm docs:generate --all                     # Generate all docs
  pnpm docs:generate --component=Button        # Generate specific component
  pnpm docs:generate --output=custom/docs      # Custom output directory
`)
}

// Handle CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv.includes('--help')) {
    showHelp()
  } else {
    main().catch(console.error)
  }
}

export { main as generateDocs }