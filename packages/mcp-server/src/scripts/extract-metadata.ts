#!/usr/bin/env tsx
/**
 * Extract Metadata Script
 * 
 * Extracts component metadata and updates the version registry
 */

import { resolve } from 'path'
import { extractComponentVersion } from '../extractors/version-extractor.js'
import { VersionRegistryService } from '../services/version-registry.js'
import { getComponentFiles } from '../utils/file-utils.js'

interface CliOptions {
  staged?: boolean
  verbose?: boolean
  force?: boolean
}

async function main() {
  const args = process.argv.slice(2)
  const options: CliOptions = {
    staged: args.includes('--staged'),
    verbose: args.includes('--verbose'),
    force: args.includes('--force')
  }

  try {
    const projectRoot = resolve(process.cwd())
    const registryService = new VersionRegistryService(projectRoot)
    
    if (options.verbose) {
      console.log('🔍 Initializing version registry...')
    }
    
    await registryService.initialize()

    // Get component files
    const componentFiles = await getComponentFiles(projectRoot)
    
    if (options.verbose) {
      console.log(`📁 Found ${componentFiles.length} component files`)
    }

    let processedCount = 0
    let updatedCount = 0
    let errorCount = 0

    console.log('🔄 Extracting component metadata...')

    for (const filePath of componentFiles) {
      try {
        const version = await extractComponentVersion(filePath)
        
        if (version) {
          // Check if we need to update this component
          const existingEntry = await registryService.getComponentEntry(version.name)
          const needsUpdate = options.force || 
            !existingEntry || 
            existingEntry.hash !== version.contentHash ||
            existingEntry.currentVersion !== version.version

          if (needsUpdate) {
            await registryService.updateComponent(version)
            updatedCount++
            
            if (options.verbose) {
              console.log(`  ✅ Updated ${version.name} (${version.version})`)
            }
          } else if (options.verbose) {
            console.log(`  ⏭️  Skipped ${version.name} (no changes)`)
          }
          
          processedCount++
        } else if (options.verbose) {
          console.log(`  ⚠️  Could not extract version from ${filePath}`)
        }
      } catch (error) {
        errorCount++
        console.error(`  ❌ Error processing ${filePath}:`, error)
      }
    }

    // Save the registry
    if (updatedCount > 0) {
      if (options.verbose) {
        console.log('💾 Saving version registry...')
      }
      await registryService.save()
    }

    // Show summary
    console.log(`\n📊 Extraction Summary:`)
    console.log(`  • Processed: ${processedCount} components`)
    console.log(`  • Updated: ${updatedCount} components`)
    if (errorCount > 0) {
      console.log(`  • Errors: ${errorCount} components`)
    }

    // Show registry statistics
    const stats = await registryService.getStatistics()
    console.log(`\n📈 Registry Statistics:`)
    console.log(`  • Total components: ${stats.total}`)
    console.log(`  • Documented: ${stats.documented}`)
    console.log(`  • Coverage: ${stats.coverage}%`)
    if (stats.outdated > 0) {
      console.log(`  • Outdated: ${stats.outdated}`)
    }

    if (errorCount > 0) {
      console.log(`\n⚠️  ${errorCount} components had errors during extraction`)
      process.exit(1)
    } else {
      console.log(`\n✅ Metadata extraction completed successfully`)
    }

  } catch (error) {
    console.error('❌ Error extracting metadata:', error)
    process.exit(1)
  }
}

// Handle CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { main as extractMetadata }