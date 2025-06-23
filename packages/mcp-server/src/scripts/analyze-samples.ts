#!/usr/bin/env tsx

/**
 * Analyze playground samples and generate sample registry
 */

import { SampleDiscoveryService } from '../services/sample-discovery.js'
import { SampleParserService } from '../services/sample-parser.js'
import * as path from 'path'

async function analyzeSamples() {
  console.log('🔍 Analyzing playground samples...')
  
  try {
    const projectRoot = path.resolve(process.cwd(), '../..')
    const playgroundPath = path.join(projectRoot, 'packages/playground/src/samples')
    
    const discovery = new SampleDiscoveryService(playgroundPath)
    const parser = new SampleParserService()
    
    // Discover all samples
    const samples = await discovery.discoverSamples()
    console.log(`✅ Discovered ${samples.length} sample files`)
    
    // Get statistics
    const stats = await discovery.getSampleStatistics()
    console.log('\n📊 Sample Statistics:')
    console.log(`- Total samples: ${stats.totalSamples}`)
    console.log(`- Unique components: ${stats.uniqueComponents}`)
    console.log(`- Average file size: ${stats.averageSize} bytes`)
    
    console.log('\n🎯 Component Coverage:')
    Object.entries(stats.componentCoverage)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .forEach(([component, count]) => {
        console.log(`- ${component}: ${count} sample(s)`)
      })
    
    console.log('\n🏷️ Popular Tags:')
    Object.entries(stats.popularTags)
      .slice(0, 10)
      .forEach(([tag, count]) => {
        console.log(`- ${tag}: ${count} occurrences`)
      })
    
    // Analyze patterns across all samples
    console.log('\n🔍 Analyzing usage patterns...')
    const patterns = await parser.extractUsagePatterns(samples)
    
    console.log(`\n📈 Usage Patterns Found (${patterns.length} total):`)
    patterns
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10)
      .forEach(pattern => {
        console.log(`- ${pattern.patternName}: ${pattern.frequency} occurrences`)
        console.log(`  Components: ${pattern.components.slice(0, 3).join(', ')}${pattern.components.length > 3 ? '...' : ''}`)
      })
    
    // Complexity analysis
    const complexityDistribution = samples.reduce((acc, sample) => {
      const complexity = sample.tags.includes('complex') ? 'complex' : 
                       sample.tags.includes('intermediate') ? 'intermediate' : 'simple'
      acc[complexity] = (acc[complexity] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    console.log('\n🧩 Complexity Distribution:')
    Object.entries(complexityDistribution).forEach(([complexity, count]) => {
      console.log(`- ${complexity}: ${count} samples`)
    })
    
    console.log('\n✅ Sample analysis completed!')
    console.log('💡 Use the MCP tools to query and generate code from these samples')
    
  } catch (error) {
    console.error('❌ Failed to analyze samples:', error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  analyzeSamples()
}