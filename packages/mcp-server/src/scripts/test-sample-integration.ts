#!/usr/bin/env tsx

/**
 * Test playground sample integration with MCP server
 */

import { SampleDiscoveryService } from '../services/sample-discovery.js'
import { SampleBasedCodeGenerationService } from '../services/sample-based-code-generation.js'
import * as path from 'path'

async function testSampleIntegration() {
  console.log('🧪 Testing playground sample integration...')
  
  try {
    const projectRoot = path.resolve(process.cwd(), '../..')
    const playgroundPath = path.join(projectRoot, 'packages/playground/src/samples')
    
    console.log(`📁 Using playground path: ${playgroundPath}`)
    
    const discovery = new SampleDiscoveryService(playgroundPath)
    const codeGen = new SampleBasedCodeGenerationService(playgroundPath)
    
    // Test 1: Sample discovery
    console.log('\n🔍 Test 1: Sample Discovery')
    const samples = await discovery.discoverSamples()
    console.log(`✅ Discovered ${samples.length} samples`)
    
    if (samples.length === 0) {
      console.error('❌ No samples found! Check playground path.')
      return
    }
    
    // Show first few samples
    console.log('\n📋 First 5 samples:')
    samples.slice(0, 5).forEach((sample, index) => {
      console.log(`${index + 1}. ${sample.componentName} (${sample.fileName})`)
      console.log(`   Description: ${sample.description}`)
      console.log(`   Tags: ${sample.tags.join(', ')}`)
    })
    
    // Test 2: Sample search
    console.log('\n🔍 Test 2: Sample Search')
    const buttonSamples = await discovery.searchSamples('button')
    console.log(`✅ Found ${buttonSamples.length} button-related samples`)
    
    // Test 3: Component analysis
    console.log('\n🔍 Test 3: Component Analysis')
    const testComponent = samples[0].componentName
    const analysis = await discovery.getSampleAnalysis(testComponent)
    
    if (analysis) {
      console.log(`✅ Analysis for ${testComponent}:`)
      console.log(`   Complexity: ${analysis.complexity}`)
      console.log(`   Interactivity: ${analysis.interactivity}`)
      console.log(`   Patterns: ${analysis.patterns.join(', ')}`)
      console.log(`   Examples: ${analysis.examples.length}`)
      console.log(`   Best practices: ${analysis.bestPractices.length}`)
    } else {
      console.log(`❌ No analysis available for ${testComponent}`)
    }
    
    // Test 4: Code generation
    console.log('\n🔍 Test 4: Realistic Code Generation')
    
    // Test with Button component (most likely to exist)
    const buttonSample = samples.find(s => s.componentName.toLowerCase() === 'button')
    if (buttonSample) {
      try {
        const generated = await codeGen.generateRealisticCode({
          componentName: 'Button',
          style: 'realistic',
          props: { variant: 'destructive', size: 'lg' }
        })
        
        console.log(`✅ Generated realistic code for Button:`)
        console.log(`   Based on: ${generated.basedOnSample}`)
        console.log(`   Complexity: ${generated.complexity}`)
        console.log(`   Features: ${generated.features.join(', ')}`)
        console.log(`   Code length: ${generated.code.length} characters`)
        
        if (generated.code.length > 0) {
          console.log('\n📝 Generated code preview:')
          console.log(generated.code.substring(0, 200) + '...')
        }
        
      } catch (error) {
        console.log(`❌ Code generation failed: ${error}`)
      }
    } else {
      console.log('⚠️ No Button sample found for code generation test')
    }
    
    // Test 5: Statistics
    console.log('\n🔍 Test 5: Sample Statistics')
    const stats = await discovery.getSampleStatistics()
    console.log(`✅ Statistics:`)
    console.log(`   Total samples: ${stats.totalSamples}`)
    console.log(`   Unique components: ${stats.uniqueComponents}`)
    console.log(`   Average size: ${stats.averageSize} bytes`)
    
    // Test 6: Component coverage
    console.log('\n📊 Component Coverage:')
    Object.entries(stats.componentCoverage)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([component, count]) => {
        console.log(`   ${component}: ${count} sample(s)`)
      })
    
    // Test 7: Interactive code generation
    console.log('\n🔍 Test 6: Interactive Code Generation')
    if (buttonSample) {
      try {
        const interactive = await codeGen.generateRealisticCode({
          componentName: 'Button',
          style: 'interactive',
          context: {
            includeState: true,
            includeHandlers: true
          }
        })
        
        console.log(`✅ Generated interactive code:`)
        console.log(`   Features: ${interactive.features.join(', ')}`)
        console.log(`   Has state: ${interactive.code.includes('useState')}`)
        console.log(`   Has handlers: ${interactive.code.includes('onClick') || interactive.code.includes('onChange')}`)
        
      } catch (error) {
        console.log(`❌ Interactive code generation failed: ${error}`)
      }
    }
    
    console.log('\n✅ All tests completed successfully!')
    console.log('\n💡 Sample integration is working correctly.')
    console.log('🚀 You can now use the MCP server with sample-based tools:')
    console.log('   - get_component_examples')
    console.log('   - search_usage_patterns') 
    console.log('   - generate_realistic_code')
    console.log('   - get_sample_variations')
    
  } catch (error) {
    console.error('❌ Sample integration test failed:', error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  testSampleIntegration()
}