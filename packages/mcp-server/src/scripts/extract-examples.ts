#!/usr/bin/env tsx

/**
 * Extract examples from playground samples for documentation
 */

import { SampleDiscoveryService } from '../services/sample-discovery.js'
import { SampleParserService } from '../services/sample-parser.js'
import * as fs from 'fs'
import * as path from 'path'

async function extractExamples() {
  console.log('🔍 Extracting examples from playground samples...')
  
  try {
    const projectRoot = path.resolve(process.cwd(), '../..')
    const playgroundPath = path.join(projectRoot, 'packages/playground/src/samples')
    const outputDir = path.join(projectRoot, 'docs/examples')
    
    // Ensure output directory exists
    await fs.promises.mkdir(outputDir, { recursive: true })
    
    const discovery = new SampleDiscoveryService(playgroundPath)
    const parser = new SampleParserService()
    
    const samples = await discovery.discoverSamples()
    console.log(`✅ Found ${samples.length} samples to process`)
    
    let extractedCount = 0
    const componentExamples: Record<string, any> = {}
    
    for (const sample of samples) {
      try {
        console.log(`📝 Processing ${sample.componentName}...`)
        
        const analysis = await parser.parseSample(sample)
        
        // Extract examples for this component
        const examples = {
          component: sample.componentName,
          description: sample.description,
          complexity: analysis.complexity,
          interactivity: analysis.interactivity,
          patterns: analysis.patterns,
          bestPractices: analysis.bestPractices,
          examples: analysis.examples.map(example => ({
            type: example.type,
            description: example.description,
            code: example.code,
            features: getExampleFeatures(example.code)
          })),
          variants: analysis.variants.filter(v => v.component === sample.componentName),
          imports: sample.imports.filter(imp => imp.includes('@rs-kit/ui-kit')),
          sampleFile: sample.fileName,
          lastModified: sample.lastModified
        }
        
        componentExamples[sample.componentName] = examples
        
        // Write individual component example file
        const outputFile = path.join(outputDir, `${sample.componentName}.json`)
        await fs.promises.writeFile(
          outputFile, 
          JSON.stringify(examples, null, 2)
        )
        
        extractedCount++
        
      } catch (error) {
        console.warn(`⚠️ Failed to process ${sample.componentName}:`, error)
      }
    }
    
    // Write consolidated examples file
    const consolidatedFile = path.join(outputDir, 'all-examples.json')
    await fs.promises.writeFile(
      consolidatedFile,
      JSON.stringify({
        lastUpdated: new Date().toISOString(),
        totalComponents: extractedCount,
        components: componentExamples
      }, null, 2)
    )
    
    // Generate examples index
    const indexFile = path.join(outputDir, 'README.md')
    let indexContent = `# Component Examples\n\n`
    indexContent += `Generated from playground samples on ${new Date().toLocaleDateString()}\n\n`
    indexContent += `## Components (${extractedCount} total)\n\n`
    
    Object.entries(componentExamples)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([componentName, data]: [string, any]) => {
        indexContent += `### ${componentName}\n\n`
        indexContent += `- **Complexity:** ${data.complexity}\n`
        indexContent += `- **Interactivity:** ${data.interactivity}\n`
        indexContent += `- **Examples:** ${data.examples.length}\n`
        indexContent += `- **Patterns:** ${data.patterns.join(', ')}\n`
        indexContent += `- **File:** [${componentName}.json](./${componentName}.json)\n\n`
      })
    
    indexContent += `\n## Usage\n\n`
    indexContent += `These examples are extracted from the playground samples and can be used for:\n\n`
    indexContent += `- Documentation generation\n`
    indexContent += `- Code generation via MCP tools\n`
    indexContent += `- Component usage reference\n`
    indexContent += `- Best practices identification\n\n`
    indexContent += `**Files:**\n`
    indexContent += `- \`all-examples.json\` - Consolidated examples for all components\n`
    indexContent += `- \`{ComponentName}.json\` - Individual component examples\n`
    
    await fs.promises.writeFile(indexFile, indexContent)
    
    console.log(`\n✅ Example extraction completed!`)
    console.log(`📁 Output directory: ${outputDir}`)
    console.log(`📊 Extracted examples for ${extractedCount} components`)
    console.log(`📄 Files created:`)
    console.log(`   - ${extractedCount} individual component files`)
    console.log(`   - 1 consolidated examples file`)
    console.log(`   - 1 README index file`)
    
  } catch (error) {
    console.error('❌ Failed to extract examples:', error)
    process.exit(1)
  }
}

function getExampleFeatures(code: string): string[] {
  const features: string[] = []
  
  if (code.includes('useState')) features.push('state-management')
  if (code.includes('useEffect')) features.push('side-effects')
  if (code.includes('onClick') || code.includes('onSubmit')) features.push('event-handling')
  if (code.includes('variant=')) features.push('variants')
  if (code.includes('size=')) features.push('sizing')
  if (code.includes('disabled')) features.push('disabled-state')
  if (code.includes('loading') || code.includes('isLoading')) features.push('loading-state')
  if (code.includes('aria-')) features.push('accessibility')
  if (code.includes('className')) features.push('custom-styling')
  
  return features
}

if (import.meta.url === `file://${process.argv[1]}`) {
  extractExamples()
}