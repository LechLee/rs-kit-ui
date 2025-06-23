/**
 * Component Discovery Service
 * 
 * Service for discovering, searching, and analyzing UI components
 */

import { VersionRegistryService } from './version-registry.js'
import { extractComponentProps, extractComponentVariants } from '../extractors/prop-extractor.js'
import { getComponentFiles, getComponentCategory } from '../utils/file-utils.js'
import type { ComponentProp, ComponentVariant } from '../schemas/documentation.js'

export interface ComponentInfo {
  name: string
  description: string
  version: string
  status: string
  category: string
  filePath: string
  exports: string[]
  tags: string[]
  props?: ComponentProp[]
  variants?: ComponentVariant[]
  lastModified: string
}

export interface ComponentSuggestion {
  component: ComponentInfo
  score: number
  reason: string
}

export interface SearchOptions {
  category?: string
  status?: string
  limit?: number
  includeProps?: boolean
  includeVariants?: boolean
}

export class ComponentDiscoveryService {
  private registryService: VersionRegistryService
  private projectRoot: string
  private componentsCache: Map<string, ComponentInfo> = new Map()
  private lastCacheUpdate = 0
  private cacheExpiryMs = 5 * 60 * 1000 // 5 minutes

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot
    this.registryService = new VersionRegistryService(projectRoot)
  }

  async initialize(): Promise<void> {
    await this.registryService.initialize()
    await this.refreshCache()
  }

  /**
   * Get all components with basic information
   */
  async getAllComponents(options: SearchOptions = {}): Promise<ComponentInfo[]> {
    await this.ensureCacheValid()
    
    let components = Array.from(this.componentsCache.values())
    
    // Apply filters
    if (options.category) {
      components = components.filter(c => c.category === options.category)
    }
    
    if (options.status) {
      components = components.filter(c => c.status === options.status)
    }
    
    // Load additional data if requested
    if (options.includeProps || options.includeVariants) {
      components = await Promise.all(
        components.map(async component => {
          const enriched = { ...component }
          
          if (options.includeProps && !component.props) {
            enriched.props = await extractComponentProps(component.filePath)
          }
          
          if (options.includeVariants && !component.variants) {
            enriched.variants = await extractComponentVariants(component.filePath)
          }
          
          return enriched
        })
      )
    }
    
    // Apply limit
    if (options.limit) {
      components = components.slice(0, options.limit)
    }
    
    return components
  }

  /**
   * Search components by name, description, or tags
   */
  async searchComponents(query: string, options: SearchOptions = {}): Promise<ComponentInfo[]> {
    const allComponents = await this.getAllComponents(options)
    const searchQuery = query.toLowerCase()
    
    const scored = allComponents.map(component => {
      let score = 0
      
      // Exact name match gets highest score
      if (component.name.toLowerCase() === searchQuery) {
        score += 100
      } else if (component.name.toLowerCase().includes(searchQuery)) {
        score += 50
      }
      
      // Description matches
      if (component.description.toLowerCase().includes(searchQuery)) {
        score += 30
      }
      
      // Tag matches
      const tagMatches = component.tags.filter(tag => 
        tag.toLowerCase().includes(searchQuery)
      ).length
      score += tagMatches * 20
      
      // Export matches
      const exportMatches = component.exports.filter(exp => 
        exp.toLowerCase().includes(searchQuery)
      ).length
      score += exportMatches * 15
      
      // Category matches
      if (component.category.toLowerCase().includes(searchQuery)) {
        score += 10
      }
      
      return { component, score }
    })
    
    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, options.limit || 10)
      .map(item => item.component)
  }

  /**
   * Get component by exact name
   */
  async getComponentByName(name: string): Promise<ComponentInfo | null> {
    await this.ensureCacheValid()
    return this.componentsCache.get(name) || null
  }

  /**
   * Get component props
   */
  async getComponentProps(componentName: string): Promise<ComponentProp[]> {
    const component = await this.getComponentByName(componentName)
    if (!component) {
      throw new Error(`Component not found: ${componentName}`)
    }
    
    if (component.props) {
      return component.props
    }
    
    const props = await extractComponentProps(component.filePath)
    
    // Cache the props
    component.props = props
    this.componentsCache.set(componentName, component)
    
    return props
  }

  /**
   * Get component variants
   */
  async getComponentVariants(componentName: string): Promise<ComponentVariant[]> {
    const component = await this.getComponentByName(componentName)
    if (!component) {
      throw new Error(`Component not found: ${componentName}`)
    }
    
    if (component.variants) {
      return component.variants
    }
    
    const variants = await extractComponentVariants(component.filePath)
    
    // Cache the variants
    component.variants = variants
    this.componentsCache.set(componentName, component)
    
    return variants
  }

  /**
   * Suggest components based on use case
   */
  async suggestComponents(useCase: string, requirements: string[] = []): Promise<ComponentSuggestion[]> {
    const allComponents = await this.getAllComponents({ includeProps: true })
    const useCaseLower = useCase.toLowerCase()
    const reqsLower = requirements.map(req => req.toLowerCase())
    
    const suggestions: ComponentSuggestion[] = []
    
    for (const component of allComponents) {
      let score = 0
      let reasons: string[] = []
      
      // Use case matching
      if (useCaseLower.includes('form') && component.category === 'ui' && 
          ['input', 'button', 'select', 'checkbox', 'textarea', 'form'].some(keyword => 
            component.name.toLowerCase().includes(keyword))) {
        score += 40
        reasons.push('Form-related component')
      }
      
      if (useCaseLower.includes('navigation') && 
          ['navigation', 'menu', 'breadcrumb', 'sidebar', 'tabs'].some(keyword => 
            component.name.toLowerCase().includes(keyword))) {
        score += 40
        reasons.push('Navigation component')
      }
      
      if (useCaseLower.includes('data') && 
          ['table', 'chart', 'card', 'list'].some(keyword => 
            component.name.toLowerCase().includes(keyword))) {
        score += 40
        reasons.push('Data display component')
      }
      
      if (useCaseLower.includes('modal') || useCaseLower.includes('dialog')) {
        if (component.name.toLowerCase().includes('dialog') || 
            component.name.toLowerCase().includes('modal') ||
            component.name.toLowerCase().includes('sheet')) {
          score += 50
          reasons.push('Modal/overlay component')
        }
      }
      
      // Requirements matching
      for (const req of reqsLower) {
        if (req.includes('accessibility') || req.includes('a11y')) {
          if (component.description.toLowerCase().includes('accessibility') ||
              component.tags.includes('accessible')) {
            score += 20
            reasons.push('Accessibility support')
          }
        }
        
        if (req.includes('mobile') || req.includes('responsive')) {
          if (component.name.toLowerCase().includes('mobile') ||
              component.description.toLowerCase().includes('mobile') ||
              component.description.toLowerCase().includes('responsive')) {
            score += 20
            reasons.push('Mobile/responsive design')
          }
        }
        
        if (req.includes('interactive') || req.includes('action')) {
          if (['button', 'input', 'select', 'switch', 'slider'].some(keyword => 
              component.name.toLowerCase().includes(keyword))) {
            score += 15
            reasons.push('Interactive component')
          }
        }
      }
      
      // Description and tag relevance
      const descWords = component.description.toLowerCase().split(' ')
      const useCaseWords = useCaseLower.split(' ')
      const commonWords = descWords.filter(word => useCaseWords.includes(word))
      score += commonWords.length * 5
      
      if (score > 0) {
        suggestions.push({
          component,
          score: Math.min(score / 100, 1), // Normalize to 0-1
          reason: reasons.join(', ') || 'Keyword match'
        })
      }
    }
    
    return suggestions
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
  }

  /**
   * Get components by category
   */
  async getComponentsByCategory(category: string): Promise<ComponentInfo[]> {
    return this.getAllComponents({ category })
  }

  /**
   * Get component statistics
   */
  async getStatistics() {
    await this.ensureCacheValid()
    
    const components = Array.from(this.componentsCache.values())
    const categories: Record<string, number> = {}
    const statuses: Record<string, number> = {}
    
    for (const component of components) {
      categories[component.category] = (categories[component.category] || 0) + 1
      statuses[component.status] = (statuses[component.status] || 0) + 1
    }
    
    return {
      total: components.length,
      categories,
      statuses,
      averagePropsPerComponent: components.reduce((sum, c) => sum + (c.props?.length || 0), 0) / components.length,
      componentsWithVariants: components.filter(c => c.variants && c.variants.length > 0).length,
    }
  }

  /**
   * Refresh the components cache
   */
  private async refreshCache(): Promise<void> {
    console.error('Refreshing component discovery cache...')
    
    const componentFiles = await getComponentFiles(this.projectRoot)
    const registry = await this.registryService.getRegistry()
    
    this.componentsCache.clear()
    
    for (const filePath of componentFiles) {
      try {
        // Find the registry entry for this file
        const registryEntry = Object.values(registry).find(entry => 
          entry.filePath === filePath
        )
        
        if (!registryEntry) {
          continue // Skip components not in registry
        }
        
        const component: ComponentInfo = {
          name: Object.keys(registry).find(name => registry[name] === registryEntry)!,
          description: this.generateComponentDescription(registryEntry.exports?.[0] || 'Component'),
          version: registryEntry.currentVersion,
          status: registryEntry.status || 'stable',
          category: getComponentCategory(filePath),
          filePath,
          exports: registryEntry.exports || [],
          tags: this.generateComponentTags(registryEntry.exports?.[0] || 'Component'),
          lastModified: registryEntry.lastModified,
        }
        
        this.componentsCache.set(component.name, component)
      } catch (error) {
        console.error(`Error processing component ${filePath}:`, error)
      }
    }
    
    this.lastCacheUpdate = Date.now()
    console.error(`Cached ${this.componentsCache.size} components`)
  }

  /**
   * Ensure cache is valid and refresh if needed
   */
  private async ensureCacheValid(): Promise<void> {
    if (Date.now() - this.lastCacheUpdate > this.cacheExpiryMs) {
      await this.refreshCache()
    }
  }

  /**
   * Generate component description
   */
  private generateComponentDescription(componentName: string): string {
    const descriptions: Record<string, string> = {
      'Button': 'A customizable button component with multiple variants and sizes',
      'Input': 'A text input component with validation and styling options',
      'Card': 'A flexible container component with header, content, and footer sections',
      'Select': 'A dropdown selection component with search and multi-select options',
      'Form': 'Form components with built-in validation and field management',
      'Dialog': 'A modal dialog component for focused user interactions',
      'Alert': 'A feedback component for displaying important messages to users',
      'Badge': 'A small status indicator or label component',
      'Avatar': 'A user profile image component with fallback initials',
      'Checkbox': 'A binary choice input component for forms',
      'Switch': 'A toggle switch component for boolean options',
      'Slider': 'A range input component for selecting values',
      'Progress': 'A progress indicator component for showing completion status',
      'Skeleton': 'A placeholder component for loading states',
      'Separator': 'A visual divider component for separating content',
      'Table': 'A data table component with sorting and styling options',
      'Tabs': 'A tabbed interface component for organizing content',
      'Accordion': 'A collapsible content container with multiple panels',
      'Calendar': 'A date picker and calendar interface component',
      'Command': 'A command palette and search interface component',
      'ContextMenu': 'A right-click context menu component',
      'DropdownMenu': 'A dropdown menu component with multiple action items',
      'HoverCard': 'A floating card component that appears on hover',
      'NavigationMenu': 'A navigation menu component with nested items',
      'Popover': 'A floating content container component',
      'Sheet': 'A slide-out panel component for secondary content',
      'Tooltip': 'A floating tooltip component for additional information'
    }
    
    return descriptions[componentName] || `${componentName} component for the UI library`
  }

  /**
   * Generate component tags
   */
  private generateComponentTags(componentName: string): string[] {
    const tagMapping: Record<string, string[]> = {
      'Button': ['interactive', 'action', 'form'],
      'Input': ['form', 'text', 'data-entry'],
      'Select': ['form', 'dropdown', 'selection'],
      'Checkbox': ['form', 'selection', 'boolean'],
      'Switch': ['form', 'toggle', 'boolean'],
      'Dialog': ['overlay', 'modal', 'focus'],
      'Sheet': ['overlay', 'panel', 'navigation'],
      'Popover': ['overlay', 'floating', 'contextual'],
      'Tooltip': ['overlay', 'help', 'information'],
      'Card': ['layout', 'container', 'content'],
      'Alert': ['feedback', 'notification', 'status'],
      'Progress': ['feedback', 'status', 'loading'],
      'Badge': ['display', 'status', 'label'],
      'Avatar': ['display', 'user', 'profile'],
      'Table': ['data', 'display', 'tabular'],
      'Calendar': ['date', 'picker', 'temporal'],
      'Navigation': ['navigation', 'menu', 'structure']
    }
    
    return tagMapping[componentName] || ['component']
  }
}

// ComponentDiscoveryService is already exported in the class declaration