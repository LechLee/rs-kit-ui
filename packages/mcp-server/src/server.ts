#!/usr/bin/env node
/**
 * Rs UI Kit MCP Server
 * 
 * Model Context Protocol server for UI Kit documentation and AI integration
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { resolve } from 'path'
import { ComponentDiscoveryService } from './services/component-discovery.js'
import { CodeGenerationService } from './services/code-generation.js'
import { VersionRegistryService } from './services/version-registry.js'
import { DocumentationGenerator } from './generators/doc-generator.js'
import { SampleDiscoveryService } from './services/sample-discovery.js'
import { SampleBasedCodeGenerationService } from './services/sample-based-code-generation.js'

class UIKitMCPServer {
  private server: Server
  private projectRoot: string
  private discoveryService: ComponentDiscoveryService
  private codeGenService: CodeGenerationService
  private registryService: VersionRegistryService
  private docGenerator: DocumentationGenerator
  private sampleDiscovery: SampleDiscoveryService
  private sampleCodeGen: SampleBasedCodeGenerationService

  constructor() {
    this.server = new Server(
      {
        name: 'rs-ui-kit-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    )

    this.projectRoot = resolve(process.cwd())
    this.discoveryService = new ComponentDiscoveryService(this.projectRoot)
    this.codeGenService = new CodeGenerationService(this.projectRoot)
    this.registryService = new VersionRegistryService(this.projectRoot)
    this.docGenerator = new DocumentationGenerator(this.projectRoot)
    this.sampleDiscovery = new SampleDiscoveryService()
    this.sampleCodeGen = new SampleBasedCodeGenerationService()

    this.setupHandlers()
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'search_components',
            description: 'Search for UI components by name, category, or description',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query (component name, category, or description)',
                },
                category: {
                  type: 'string',
                  description: 'Filter by component category (ui, custom, hooks, utilities)',
                },
                limit: {
                  type: 'number',
                  description: 'Maximum number of results to return',
                  default: 10,
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'get_component_info',
            description: 'Get detailed information about a specific component',
            inputSchema: {
              type: 'object',
              properties: {
                componentName: {
                  type: 'string',
                  description: 'Name of the component to get information for',
                },
              },
              required: ['componentName'],
            },
          },
          {
            name: 'generate_component_code',
            description: 'Generate usage code for a component with specified props',
            inputSchema: {
              type: 'object',
              properties: {
                componentName: {
                  type: 'string',
                  description: 'Name of the component',
                },
                props: {
                  type: 'object',
                  description: 'Props to include in the generated code',
                },
                includeImport: {
                  type: 'boolean',
                  description: 'Whether to include import statement',
                  default: true,
                },
                style: {
                  type: 'string',
                  enum: ['basic', 'advanced', 'example'],
                  description: 'Style of code generation',
                  default: 'basic',
                },
              },
              required: ['componentName'],
            },
          },
          {
            name: 'list_component_props',
            description: 'List all available props for a component',
            inputSchema: {
              type: 'object',
              properties: {
                componentName: {
                  type: 'string',
                  description: 'Name of the component',
                },
              },
              required: ['componentName'],
            },
          },
          {
            name: 'suggest_components',
            description: 'Suggest components based on use case or requirements',
            inputSchema: {
              type: 'object',
              properties: {
                useCase: {
                  type: 'string',
                  description: 'Description of what you want to build',
                },
                requirements: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Specific requirements (accessibility, mobile, etc.)',
                },
              },
              required: ['useCase'],
            },
          },
          {
            name: 'get_documentation_status',
            description: 'Get documentation coverage and status for all components',
            inputSchema: {
              type: 'object',
              properties: {
                outdatedOnly: {
                  type: 'boolean',
                  description: 'Only show components with outdated documentation',
                  default: false,
                },
              },
            },
          },
          {
            name: 'generate_documentation',
            description: 'Generate documentation for specific components',
            inputSchema: {
              type: 'object',
              properties: {
                componentNames: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Names of components to generate docs for',
                },
                all: {
                  type: 'boolean',
                  description: 'Generate docs for all outdated components',
                  default: false,
                },
              },
            },
          },
          {
            name: 'get_component_examples',
            description: 'Get real playground examples for a component',
            inputSchema: {
              type: 'object',
              properties: {
                componentName: {
                  type: 'string',
                  description: 'Name of the component to get examples for',
                },
                includeAnalysis: {
                  type: 'boolean',
                  description: 'Include detailed analysis of the examples',
                  default: false,
                },
              },
              required: ['componentName'],
            },
          },
          {
            name: 'search_usage_patterns',
            description: 'Find components by usage patterns from playground samples',
            inputSchema: {
              type: 'object',
              properties: {
                pattern: {
                  type: 'string',
                  description: 'Usage pattern to search for (e.g., "form-handling", "state-management")',
                },
                complexity: {
                  type: 'string',
                  enum: ['simple', 'intermediate', 'complex'],
                  description: 'Filter by complexity level',
                },
                limit: {
                  type: 'number',
                  description: 'Maximum number of results',
                  default: 10,
                },
              },
              required: ['pattern'],
            },
          },
          {
            name: 'generate_realistic_code',
            description: 'Generate code based on actual playground implementations',
            inputSchema: {
              type: 'object',
              properties: {
                componentName: {
                  type: 'string',
                  description: 'Name of the component',
                },
                style: {
                  type: 'string',
                  enum: ['basic', 'advanced', 'interactive', 'realistic'],
                  description: 'Style of code generation based on samples',
                  default: 'realistic',
                },
                props: {
                  type: 'object',
                  description: 'Props to include in the generated code',
                },
                context: {
                  type: 'object',
                  properties: {
                    usecase: {
                      type: 'string',
                      description: 'Specific use case (form, dashboard, navigation)',
                    },
                    complexity: {
                      type: 'string',
                      enum: ['simple', 'intermediate', 'complex'],
                      description: 'Desired complexity level',
                    },
                    includeState: {
                      type: 'boolean',
                      description: 'Include state management',
                    },
                    includeHandlers: {
                      type: 'boolean',
                      description: 'Include event handlers',
                    },
                  },
                },
              },
              required: ['componentName'],
            },
          },
          {
            name: 'get_sample_variations',
            description: 'Show different variations and demos from playground samples',
            inputSchema: {
              type: 'object',
              properties: {
                componentName: {
                  type: 'string',
                  description: 'Name of the component',
                },
                variationType: {
                  type: 'string',
                  enum: ['variants', 'sizes', 'states', 'patterns'],
                  description: 'Type of variations to show',
                  default: 'variants',
                },
              },
              required: ['componentName'],
            },
          },
        ],
      }
    })

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params

      try {
        switch (name) {
          case 'search_components':
            return await this.handleSearchComponents(args)

          case 'get_component_info':
            return await this.handleGetComponentInfo(args)

          case 'generate_component_code':
            return await this.handleGenerateComponentCode(args)

          case 'list_component_props':
            return await this.handleListComponentProps(args)

          case 'suggest_components':
            return await this.handleSuggestComponents(args)

          case 'get_documentation_status':
            return await this.handleGetDocumentationStatus(args)

          case 'generate_documentation':
            return await this.handleGenerateDocumentation(args)

          case 'get_component_examples':
            return await this.handleGetComponentExamples(args)

          case 'search_usage_patterns':
            return await this.handleSearchUsagePatterns(args)

          case 'generate_realistic_code':
            return await this.handleGenerateRealisticCode(args)

          case 'get_sample_variations':
            return await this.handleGetSampleVariations(args)

          default:
            throw new Error(`Unknown tool: ${name}`)
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing ${name}: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    })

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      const components = await this.discoveryService.getAllComponents()
      const samples = await this.sampleDiscovery.discoverSamples()
      
      return {
        resources: [
          {
            uri: 'components://all',
            name: 'All Components',
            description: 'Complete list of all UI components',
            mimeType: 'application/json',
          },
          {
            uri: 'registry://version-registry',
            name: 'Version Registry',
            description: 'Component version tracking registry',
            mimeType: 'application/yaml',
          },
          {
            uri: 'samples://all',
            name: 'All Playground Samples',
            description: 'Complete list of playground sample files',
            mimeType: 'application/json',
          },
          {
            uri: 'patterns://usage',
            name: 'Usage Patterns',
            description: 'Common usage patterns extracted from samples',
            mimeType: 'application/json',
          },
          {
            uri: 'examples://interactive',
            name: 'Interactive Examples',
            description: 'Interactive examples with state management',
            mimeType: 'application/json',
          },
          ...components.map(component => ({
            uri: `component://${component.name}`,
            name: component.name,
            description: component.description,
            mimeType: 'application/json',
          })),
          ...samples.map(sample => ({
            uri: `samples://${sample.componentName}`,
            name: `${sample.componentName} Sample`,
            description: sample.description,
            mimeType: 'application/json',
          })),
        ],
      }
    })

    // Handle resource reads
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params

      try {
        if (uri === 'components://all') {
          const components = await this.discoveryService.getAllComponents()
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(components, null, 2),
              },
            ],
          }
        }

        if (uri === 'registry://version-registry') {
          const registry = await this.registryService.getRegistry()
          return {
            contents: [
              {
                uri,
                mimeType: 'application/yaml',
                text: JSON.stringify(registry, null, 2),
              },
            ],
          }
        }

        if (uri.startsWith('component://')) {
          const componentName = uri.replace('component://', '')
          const component = await this.discoveryService.getComponentByName(componentName)
          
          if (!component) {
            throw new Error(`Component not found: ${componentName}`)
          }

          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(component, null, 2),
              },
            ],
          }
        }

        throw new Error(`Unknown resource: ${uri}`)
      } catch (error) {
        throw new Error(`Failed to read resource ${uri}: ${error instanceof Error ? error.message : String(error)}`)
      }
    })
  }

  private async handleSearchComponents(args: any) {
    const { query, category, limit = 10 } = args
    const results = await this.discoveryService.searchComponents(query, { category, limit })

    return {
      content: [
        {
          type: 'text',
          text: `Found ${results.length} components matching "${query}":\n\n` +
            results.map(component => 
              `**${component.name}** (${component.category})\n` +
              `${component.description}\n` +
              `Version: ${component.version} | Status: ${component.status}\n` +
              `Exports: ${component.exports.join(', ')}\n`
            ).join('\n'),
        },
      ],
    }
  }

  private async handleGetComponentInfo(args: any) {
    const { componentName } = args
    const component = await this.discoveryService.getComponentByName(componentName)

    if (!component) {
      throw new Error(`Component not found: ${componentName}`)
    }

    const props = await this.discoveryService.getComponentProps(componentName)
    const variants = await this.discoveryService.getComponentVariants(componentName)

    return {
      content: [
        {
          type: 'text',
          text: `# ${component.name}\n\n` +
            `**Description:** ${component.description}\n` +
            `**Version:** ${component.version}\n` +
            `**Status:** ${component.status}\n` +
            `**Category:** ${component.category}\n` +
            `**Exports:** ${component.exports.join(', ')}\n\n` +
            `## Props\n${props.length ? props.map(prop => 
              `- **${prop.name}** (\`${prop.type}\`) ${prop.required ? '*(required)*' : '*(optional)*'}: ${prop.description}`
            ).join('\n') : 'No props documented.'}\n\n` +
            `## Variants\n${variants.length ? variants.map(variant =>
              `- **${variant.name}**: ${variant.options.map(opt => `\`${opt.value}\``).join(', ')}`
            ).join('\n') : 'No variants available.'}\n`,
        },
      ],
    }
  }

  private async handleGenerateComponentCode(args: any) {
    const { componentName, props = {}, includeImport = true, style = 'basic' } = args
    const code = await this.codeGenService.generateComponentUsage(componentName, props, { includeImport, style })

    return {
      content: [
        {
          type: 'text',
          text: `Generated ${style} usage code for ${componentName}:\n\n\`\`\`tsx\n${code}\n\`\`\``,
        },
      ],
    }
  }

  private async handleListComponentProps(args: any) {
    const { componentName } = args
    const props = await this.discoveryService.getComponentProps(componentName)

    return {
      content: [
        {
          type: 'text',
          text: `Props for ${componentName}:\n\n` +
            props.map(prop => 
              `**${prop.name}** (\`${prop.type}\`) ${prop.required ? '*(required)*' : '*(optional)*'}\n` +
              `${prop.description}\n` +
              (prop.defaultValue ? `Default: \`${prop.defaultValue}\`\n` : '') + '\n'
            ).join(''),
        },
      ],
    }
  }

  private async handleSuggestComponents(args: any) {
    const { useCase, requirements = [] } = args
    const suggestions = await this.discoveryService.suggestComponents(useCase, requirements)

    return {
      content: [
        {
          type: 'text',
          text: `Component suggestions for "${useCase}":\n\n` +
            suggestions.map(suggestion => 
              `**${suggestion.component.name}** (Match: ${Math.round(suggestion.score * 100)}%)\n` +
              `${suggestion.component.description}\n` +
              `Reason: ${suggestion.reason}\n`
            ).join('\n'),
        },
      ],
    }
  }

  private async handleGetDocumentationStatus(args: any) {
    const { outdatedOnly = false } = args
    const stats = await this.registryService.getStatistics()
    
    let results
    if (outdatedOnly) {
      results = await this.registryService.getOutdatedComponents()
    } else {
      const registry = await this.registryService.getRegistry()
      const allComponentNames = Object.keys(registry)
      results = await Promise.all(
        allComponentNames.map(async (name: string) => {
          const entry = await this.registryService.getComponentEntry(name)
          return entry ? {
            componentName: name,
            currentVersion: entry.currentVersion,
            documentationVersion: entry.documentationVersion || 'Missing',
            needsUpdate: !entry.documentationVersion || entry.currentVersion !== entry.documentationVersion,
            lastModified: entry.lastModified,
          } : null
        })
      )
      results = results.filter((result): result is NonNullable<typeof result> => result !== null)
    }

    return {
      content: [
        {
          type: 'text',
          text: `Documentation Status:\n\n` +
            `**Overall Statistics:**\n` +
            `- Total components: ${stats.total}\n` +
            `- Documented: ${stats.documented}\n` +
            `- Coverage: ${stats.coverage}%\n` +
            `- Outdated: ${stats.outdated}\n\n` +
            `**Component Details:**\n` +
            results.map((result: any) => 
              `- **${result.componentName}** (v${result.currentVersion}): ` +
              `${result.needsUpdate ? '❌ Needs update' : '✅ Up to date'} ` +
              `(Doc: ${result.documentationVersion})`
            ).join('\n'),
        },
      ],
    }
  }

  private async handleGenerateDocumentation(args: any) {
    const { componentNames = [], all = false } = args
    
    let generatedFiles: string[] = []
    
    if (all) {
      generatedFiles = await this.docGenerator.generateOutdatedDocs()
    } else if (componentNames.length > 0) {
      for (const componentName of componentNames) {
        const entry = await this.registryService.getComponentEntry(componentName)
        if (entry?.filePath) {
          const outputPath = await this.docGenerator.generateComponentDocs(entry.filePath)
          if (outputPath) {
            generatedFiles.push(outputPath)
          }
        }
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: `Documentation generation completed!\n\n` +
            `Generated ${generatedFiles.length} documentation files:\n` +
            generatedFiles.map(file => `- ${file}`).join('\n') + '\n\n' +
            `Use \`get_documentation_status\` to check updated coverage.`,
        },
      ],
    }
  }

  private async handleGetComponentExamples(args: any) {
    const { componentName, includeAnalysis = false } = args
    
    const sample = await this.sampleDiscovery.getSampleForComponent(componentName)
    if (!sample) {
      return {
        content: [
          {
            type: 'text',
            text: `No playground sample found for component: ${componentName}`,
          },
        ],
      }
    }

    let result = `# ${componentName} Playground Examples\n\n`
    result += `**File:** ${sample.fileName}\n`
    result += `**Description:** ${sample.description}\n`
    result += `**Size:** ${Math.round(sample.size / 1024)}KB\n`
    result += `**Tags:** ${sample.tags.join(', ')}\n\n`

    if (includeAnalysis) {
      const analysis = await this.sampleDiscovery.getSampleAnalysis(componentName)
      if (analysis) {
        result += `## Analysis\n\n`
        result += `**Complexity:** ${analysis.complexity}\n`
        result += `**Interactivity:** ${analysis.interactivity}\n`
        result += `**Patterns:** ${analysis.patterns.join(', ')}\n\n`
        
        if (analysis.examples.length > 0) {
          result += `## Code Examples\n\n`
          analysis.examples.slice(0, 3).forEach((example, index) => {
            result += `### ${example.type} Example ${index + 1}\n\n`
            result += `\`\`\`tsx\n${example.code}\n\`\`\`\n\n`
          })
        }

        if (analysis.bestPractices.length > 0) {
          result += `## Best Practices\n\n`
          analysis.bestPractices.forEach(practice => {
            result += `- ${practice}\n`
          })
          result += `\n`
        }
      }
    }

    // Include sample imports
    if (sample.imports.length > 0) {
      result += `## Sample Imports\n\n`
      result += `\`\`\`tsx\n${sample.imports.join('\n')}\n\`\`\`\n\n`
    }

    return {
      content: [
        {
          type: 'text',
          text: result,
        },
      ],
    }
  }

  private async handleSearchUsagePatterns(args: any) {
    const { pattern, complexity, limit = 10 } = args
    
    const samples = await this.sampleDiscovery.searchSamples(pattern)
    let filteredSamples = samples

    if (complexity) {
      const analysisPromises = samples.map(sample => 
        this.sampleDiscovery.getSampleAnalysis(sample.componentName)
      )
      const analyses = await Promise.all(analysisPromises)
      
      filteredSamples = samples.filter((sample, index) => {
        const analysis = analyses[index]
        return analysis?.complexity === complexity
      })
    }

    const results = filteredSamples.slice(0, limit)

    let response = `# Usage Pattern Search: "${pattern}"\n\n`
    response += `Found ${results.length} components matching pattern.\n\n`

    if (results.length === 0) {
      response += `No components found with pattern "${pattern}".`
      if (complexity) {
        response += ` Try without the complexity filter or use a different pattern.`
      }
    } else {
      results.forEach((sample, index) => {
        response += `## ${index + 1}. ${sample.componentName}\n\n`
        response += `**Description:** ${sample.description}\n`
        response += `**Tags:** ${sample.tags.join(', ')}\n`
        response += `**File:** ${sample.fileName}\n\n`
      })

      response += `\n**Common patterns found:**\n`
      const allTags = results.flatMap(sample => sample.tags)
      const tagCounts = allTags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      Object.entries(tagCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .forEach(([tag, count]) => {
          response += `- ${tag} (${count} components)\n`
        })
    }

    return {
      content: [
        {
          type: 'text',
          text: response,
        },
      ],
    }
  }

  private async handleGenerateRealisticCode(args: any) {
    const { componentName, style = 'realistic', props, context } = args
    
    try {
      const result = await this.sampleCodeGen.generateRealisticCode({
        componentName,
        style: style as any,
        props,
        context
      })

      let response = `# Generated ${style} code for ${componentName}\n\n`
      response += `**Based on:** ${result.basedOnSample}\n`
      response += `**Complexity:** ${result.complexity}\n`
      response += `**Features:** ${result.features.join(', ')}\n\n`

      if (result.imports.length > 0) {
        response += `## Imports\n\n`
        response += `\`\`\`tsx\n${result.imports.join('\n')}\n\`\`\`\n\n`
      }

      response += `## Generated Code\n\n`
      response += `\`\`\`tsx\n${result.code}\n\`\`\`\n\n`

      response += `## Description\n\n${result.description}\n\n`

      if (result.bestPractices.length > 0) {
        response += `## Best Practices Applied\n\n`
        result.bestPractices.forEach(practice => {
          response += `- ${practice}\n`
        })
      }

      return {
        content: [
          {
            type: 'text',
            text: response,
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error generating realistic code for ${componentName}: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      }
    }
  }

  private async handleGetSampleVariations(args: any) {
    const { componentName, variationType = 'variants' } = args
    
    const analysis = await this.sampleDiscovery.getSampleAnalysis(componentName)
    if (!analysis) {
      return {
        content: [
          {
            type: 'text',
            text: `No sample analysis found for component: ${componentName}`,
          },
        ],
      }
    }

    let response = `# ${componentName} Sample Variations\n\n`
    
    switch (variationType) {
      case 'variants':
        const variants = analysis.variants.filter(v => v.component === componentName)
        if (variants.length > 0) {
          response += `## Available Variants\n\n`
          const variantGroups = variants.reduce((acc, variant) => {
            if (!acc[variant.variant]) acc[variant.variant] = []
            acc[variant.variant].push(variant.value)
            return acc
          }, {} as Record<string, string[]>)

          Object.entries(variantGroups).forEach(([variantType, values]) => {
            response += `### ${variantType}\n`
            values.forEach(value => {
              response += `- \`${value}\`\n`
            })
            response += `\n`
          })
        } else {
          response += `No variants found in sample for ${componentName}.\n`
        }
        break

      case 'patterns':
        if (analysis.patterns.length > 0) {
          response += `## Usage Patterns\n\n`
          analysis.patterns.forEach(pattern => {
            response += `- **${pattern}**\n`
          })
        } else {
          response += `No specific patterns identified for ${componentName}.\n`
        }
        break

      case 'states':
        const hasInteractiveStates = analysis.interactivity !== 'static'
        response += `## Component States\n\n`
        response += `**Interactivity Level:** ${analysis.interactivity}\n\n`
        
        if (hasInteractiveStates) {
          response += `This component has interactive states in the sample:\n`
          if (analysis.patterns.includes('useState-pattern')) {
            response += `- ✅ State management\n`
          }
          if (analysis.patterns.includes('click-handling')) {
            response += `- ✅ Click event handling\n`
          }
          if (analysis.patterns.includes('form-submission')) {
            response += `- ✅ Form submission\n`
          }
          if (analysis.patterns.includes('loading-state')) {
            response += `- ✅ Loading states\n`
          }
        } else {
          response += `This component is primarily static in the sample.\n`
        }
        break

      default:
        response += `## All Variations\n\n`
        response += `**Complexity:** ${analysis.complexity}\n`
        response += `**Interactivity:** ${analysis.interactivity}\n`
        response += `**Patterns:** ${analysis.patterns.join(', ')}\n\n`
        
        if (analysis.examples.length > 0) {
          response += `**Example Types:**\n`
          analysis.examples.forEach(example => {
            response += `- ${example.type}: ${example.description}\n`
          })
        }
    }

    return {
      content: [
        {
          type: 'text',
          text: response,
        },
      ],
    }
  }

  async initialize() {
    await this.registryService.initialize()
    await this.discoveryService.initialize()
    await this.docGenerator.initialize()
  }

  async start() {
    await this.initialize()
    
    const transport = new StdioServerTransport()
    await this.server.connect(transport)
    
    console.error('Rs UI Kit MCP Server started successfully')
  }
}

// Start the server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const server = new UIKitMCPServer()
  server.start().catch(console.error)
}

export { UIKitMCPServer }