#!/usr/bin/env tsx
/**
 * Test MCP Server
 * 
 * Test script to verify MCP server functionality
 */

import { ComponentDiscoveryService } from '../services/component-discovery.js'
import { CodeGenerationService } from '../services/code-generation.js'
import { resolve } from 'path'

async function main() {
  try {
    console.log('🔧 Testing MCP Server Components...')
    
    const projectRoot = resolve(process.cwd())
    console.log(`Project root: ${projectRoot}`)
    
    // Test Component Discovery Service
    console.log('\n📋 Testing Component Discovery Service...')
    const discoveryService = new ComponentDiscoveryService(projectRoot)
    await discoveryService.initialize()
    
    const allComponents = await discoveryService.getAllComponents({ limit: 5 })
    console.log(`Found ${allComponents.length} components (showing first 5):`)
    allComponents.forEach(comp => {
      console.log(`  • ${comp.name} (${comp.category}) - v${comp.version}`)
      console.log(`    ${comp.description}`)
      console.log(`    Exports: ${comp.exports.join(', ')}`)
      console.log()
    })
    
    // Test search functionality
    console.log('🔍 Testing component search...')
    const searchResults = await discoveryService.searchComponents('button', { limit: 3 })
    console.log(`Search results for "button":`)
    searchResults.forEach(comp => {
      console.log(`  • ${comp.name} - ${comp.description}`)
    })
    
    // Test component info retrieval
    console.log('\n📝 Testing component info retrieval...')
    const buttonComponent = await discoveryService.getComponentByName('Button')
    if (buttonComponent) {
      console.log(`Button component found:`)
      console.log(`  Name: ${buttonComponent.name}`)
      console.log(`  Version: ${buttonComponent.version}`)
      console.log(`  Status: ${buttonComponent.status}`)
      console.log(`  Exports: ${buttonComponent.exports.join(', ')}`)
      
      // Test prop extraction
      const props = await discoveryService.getComponentProps('Button')
      console.log(`  Props: ${props.length} found`)
      props.slice(0, 3).forEach(prop => {
        console.log(`    - ${prop.name}: ${prop.type} ${prop.required ? '(required)' : '(optional)'}`)
      })
      
      // Test variant extraction
      const variants = await discoveryService.getComponentVariants('Button')
      console.log(`  Variants: ${variants.length} found`)
      variants.forEach(variant => {
        console.log(`    - ${variant.name}: ${variant.options.map(opt => opt.value).join(', ')}`)
      })
    }
    
    // Test Code Generation Service
    console.log('\n🎨 Testing Code Generation Service...')
    const codeGenService = new CodeGenerationService(projectRoot)
    await codeGenService.initialize()
    
    // Test basic code generation
    const basicCode = await codeGenService.generateComponentUsage('Button', {}, { style: 'basic' })
    console.log('Basic Button usage:')
    console.log(basicCode)
    
    // Test advanced code generation
    const advancedCode = await codeGenService.generateComponentUsage('Button', 
      { variant: 'destructive', size: 'lg' }, 
      { style: 'advanced' }
    )
    console.log('\nAdvanced Button usage:')
    console.log(advancedCode)
    
    // Test component suggestions
    console.log('\n💡 Testing component suggestions...')
    const suggestions = await discoveryService.suggestComponents(
      'I need to create a form with input fields and a submit button',
      ['accessibility', 'responsive']
    )
    console.log('Component suggestions for form creation:')
    suggestions.slice(0, 3).forEach(suggestion => {
      console.log(`  • ${suggestion.component.name} (${Math.round(suggestion.score * 100)}% match)`)
      console.log(`    Reason: ${suggestion.reason}`)
    })
    
    // Test statistics
    console.log('\n📊 Component statistics:')
    const stats = await discoveryService.getStatistics()
    console.log(`  Total components: ${stats.total}`)
    console.log(`  Categories: ${Object.entries(stats.categories).map(([cat, count]) => `${cat}(${count})`).join(', ')}`)
    console.log(`  Statuses: ${Object.entries(stats.statuses).map(([status, count]) => `${status}(${count})`).join(', ')}`)
    console.log(`  Components with variants: ${stats.componentsWithVariants}`)
    
    console.log('\n✅ MCP Server component test completed successfully!')
    
  } catch (error) {
    console.error('❌ Error testing MCP server:', error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}