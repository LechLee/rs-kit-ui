#!/usr/bin/env tsx
/**
 * Version Check Script
 * 
 * Compares component versions with documentation versions and reports differences
 */

import { resolve } from 'path'
import { extractComponentVersion } from '../extractors/version-extractor.js'
import { VersionRegistryService } from '../services/version-registry.js'
import { getComponentFiles } from '../utils/file-utils.js'

interface CliOptions {
  json?: boolean
  changedOnly?: boolean
  staged?: boolean
  verbose?: boolean
}

async function main() {
  const args = process.argv.slice(2)
  const options: CliOptions = {
    json: args.includes('--json'),
    changedOnly: args.includes('--changed-only'),
    staged: args.includes('--staged'),
    verbose: args.includes('--verbose')
  }

  try {
    const projectRoot = resolve(process.cwd())
    const registryService = new VersionRegistryService(projectRoot)
    await registryService.initialize()

    // Get component files
    const componentFiles = await getComponentFiles(projectRoot)
    
    if (options.verbose) {
      console.log(`Found ${componentFiles.length} component files`)
    }

    // Extract current versions
    const currentVersions = []
    for (const filePath of componentFiles) {
      const version = await extractComponentVersion(filePath)
      if (version) {
        currentVersions.push(version)
      }
    }

    if (options.verbose) {
      console.log(`Extracted versions for ${currentVersions.length} components`)
    }

    // Compare versions
    const comparisonResults = await registryService.compareVersions(currentVersions)
    
    // Filter results if needed
    let filteredResults = comparisonResults
    if (options.changedOnly) {
      filteredResults = comparisonResults.filter(result => result.needsUpdate)
    }

    // Output results
    if (options.json) {
      console.log(JSON.stringify(filteredResults, null, 2))
    } else {
      await displayResults(filteredResults, options.verbose || false)
    }

    // Exit with appropriate code
    const hasOutdated = filteredResults.some(result => result.needsUpdate)
    process.exit(hasOutdated ? 1 : 0)

  } catch (error) {
    console.error('Error checking versions:', error)
    process.exit(1)
  }
}

async function displayResults(results: any[], verbose: boolean) {
  if (results.length === 0) {
    console.log('✅ All documentation is up to date!')
    return
  }

  const outdated = results.filter(r => r.needsUpdate)
  const upToDate = results.filter(r => !r.needsUpdate)

  console.log(`\n📊 Version Check Results`)
  console.log(`${'='.repeat(50)}`)
  console.log(`Total components: ${results.length}`)
  console.log(`Up to date: ${upToDate.length}`)
  console.log(`Need updates: ${outdated.length}`)

  if (outdated.length > 0) {
    console.log(`\n⚠️  Components needing documentation updates:`)
    console.log(`${'='.repeat(50)}`)
    
    // Create table
    const table = outdated.map(result => ({
      Component: result.componentName,
      'Current Version': result.versionDiff.current,
      'Doc Version': result.versionDiff.documented || 'Missing',
      Status: getStatusIcon(result.reason),
      Priority: getPriorityIcon(result.priority)
    }))

    console.table(table)

    // Show priority breakdown
    const priorityCounts = outdated.reduce((acc, result) => {
      acc[result.priority] = (acc[result.priority] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    console.log(`\n📋 Priority Breakdown:`)
    for (const [priority, count] of Object.entries(priorityCounts)) {
      console.log(`  ${getPriorityIcon(priority)} ${priority}: ${count} components`)
    }

    console.log(`\n💡 Next steps:`)
    console.log(`  • Run 'pnpm docs:update-outdated' to update all outdated documentation`)
    console.log(`  • Run 'pnpm docs:update <component-name>' to update specific components`)
    console.log(`  • Use '--json' flag for machine-readable output`)
  }

  if (verbose && upToDate.length > 0) {
    console.log(`\n✅ Up-to-date components:`)
    upToDate.forEach(result => {
      console.log(`  • ${result.componentName} (${result.versionDiff.current})`)
    })
  }
}

function getStatusIcon(reason: string): string {
  switch (reason) {
    case 'version_mismatch': return '🔄 Version diff'
    case 'hash_mismatch': return '📝 Content changed'
    case 'missing_docs': return '📝 Missing docs'
    case 'stale_docs': return '⏰ Stale'
    case 'up_to_date': return '✅ Current'
    default: return '❓ Unknown'
  }
}

function getPriorityIcon(priority: string): string {
  switch (priority) {
    case 'critical': return '🔥'
    case 'high': return '⚠️'
    case 'medium': return '🟡'
    case 'low': return '🟢'
    default: return '❓'
  }
}

// Handle CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { main as versionCheck }