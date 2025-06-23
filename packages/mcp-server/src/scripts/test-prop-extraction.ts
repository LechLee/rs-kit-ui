#!/usr/bin/env tsx
/**
 * Test Prop Extraction
 * 
 * Test script to verify prop extraction functionality
 */

import { extractComponentProps, extractComponentVariants } from '../extractors/prop-extractor.js'
import { resolve } from 'path'

async function main() {
  try {
    const projectRoot = resolve(process.cwd())
    const buttonPath = `${projectRoot}/packages/ui-kit/components/ui/button.tsx`
    
    console.log('🔍 Testing prop extraction on Button component...')
    console.log(`File: ${buttonPath}`)
    
    // Test prop extraction
    console.log('\n📋 Extracting props...')
    const props = await extractComponentProps(buttonPath)
    console.log(`Found ${props.length} props:`)
    props.forEach(prop => {
      console.log(`  • ${prop.name}: ${prop.type} ${prop.required ? '(required)' : '(optional)'}`)
      console.log(`    ${prop.description}`)
      if (prop.defaultValue) {
        console.log(`    Default: ${prop.defaultValue}`)
      }
      console.log()
    })
    
    // Test variant extraction
    console.log('\n🎨 Extracting variants...')
    const variants = await extractComponentVariants(buttonPath)
    console.log(`Found ${variants.length} variants:`)
    variants.forEach(variant => {
      console.log(`  • ${variant.name} (${variant.type}):`)
      variant.options.forEach(option => {
        const isDefault = variant.defaultValue === option.value ? ' (default)' : ''
        console.log(`    - ${option.value}${isDefault}: ${option.description}`)
      })
      console.log()
    })
    
  } catch (error) {
    console.error('❌ Error testing prop extraction:', error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}