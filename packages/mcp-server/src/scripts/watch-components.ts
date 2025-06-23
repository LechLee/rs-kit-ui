#!/usr/bin/env tsx
/**
 * Watch Components Script
 * 
 * Watches for changes to component files and automatically updates version registry
 */

import chokidar from 'chokidar'
import { resolve } from 'path'
import { extractComponentVersion } from '../extractors/version-extractor.js'
import { VersionRegistryService } from '../services/version-registry.js'

async function main() {
  const projectRoot = resolve(process.cwd())
  const registryService = new VersionRegistryService(projectRoot)
  await registryService.initialize()

  console.log('🔍 Starting component file watcher...')

  const patterns = [
    `${projectRoot}/packages/ui-kit/components/ui/*.tsx`,
    `${projectRoot}/packages/ui-kit/components/custom/*.tsx`,
    `${projectRoot}/packages/ui-kit/hooks/*.ts`,
    `${projectRoot}/packages/ui-kit/lib/*.ts`
  ]

  const watcher = chokidar.watch(patterns, {
    ignored: /node_modules/,
    persistent: true,
    usePolling: false
  })

  watcher
    .on('change', async (filePath) => {
      console.log(`📝 File changed: ${filePath}`)
      try {
        const version = await extractComponentVersion(filePath)
        if (version) {
          await registryService.updateComponent(version)
          await registryService.save()
          console.log(`✅ Updated ${version.name} (${version.version})`)
        }
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error)
      }
    })
    .on('add', async (filePath) => {
      console.log(`➕ New file: ${filePath}`)
      try {
        const version = await extractComponentVersion(filePath)
        if (version) {
          await registryService.updateComponent(version)
          await registryService.save()
          console.log(`✅ Added ${version.name} (${version.version})`)
        }
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error)
      }
    })
    .on('unlink', (filePath) => {
      console.log(`➖ File removed: ${filePath}`)
      // TODO: Remove from registry
    })
    .on('ready', () => {
      console.log('👀 Watching for component changes...')
    })

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping watcher...')
    watcher.close()
    process.exit(0)
  })
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { main as watchComponents }