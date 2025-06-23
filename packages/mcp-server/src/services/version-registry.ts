/**
 * Version Registry Service
 * 
 * Manages the component version registry and provides comparison capabilities
 */

import { readFile, writeFile, mkdir } from 'fs/promises'
import { dirname, join } from 'path'
import YAML from 'yaml'
import type { 
  ComponentVersionRegistry, 
  ComponentVersionEntry, 
  VersionComparisonResult,
  ComponentVersion,
  ChangeType,
  UpdatePriority,
  EffortEstimate,
  ComparisonReason
} from '../schemas/version-registry.js'

export class VersionRegistryService {
  private registry: ComponentVersionRegistry = {}
  private registryPath: string
  private initialized = false

  constructor(projectRoot: string) {
    this.registryPath = join(projectRoot, '.version-registry.yml')
  }

  /**
   * Initialize the registry by loading from disk
   */
  async initialize(): Promise<void> {
    if (this.initialized) return

    try {
      const content = await readFile(this.registryPath, 'utf-8')
      this.registry = YAML.parse(content) || {}
    } catch (error) {
      // File doesn't exist or is invalid, start with empty registry
      this.registry = {}
    }

    this.initialized = true
  }

  /**
   * Save the registry to disk
   */
  async save(): Promise<void> {
    await this.initialize()
    
    // Ensure directory exists
    await mkdir(dirname(this.registryPath), { recursive: true })
    
    const content = YAML.stringify(this.registry, {
      indent: 2,
      lineWidth: 120,
      minContentWidth: 60
    })
    
    await writeFile(this.registryPath, content, 'utf-8')
  }

  /**
   * Get the current registry
   */
  async getRegistry(): Promise<ComponentVersionRegistry> {
    await this.initialize()
    return { ...this.registry }
  }

  /**
   * Get entry for a specific component
   */
  async getComponentEntry(componentName: string): Promise<ComponentVersionEntry | null> {
    await this.initialize()
    return this.registry[componentName] || null
  }

  /**
   * Update or create a component entry
   */
  async updateComponent(componentVersion: ComponentVersion): Promise<void> {
    await this.initialize()
    
    const existing = this.registry[componentVersion.name]
    const now = new Date().toISOString()
    
    this.registry[componentVersion.name] = {
      currentVersion: componentVersion.version,
      lastModified: componentVersion.lastModified,
      filePath: componentVersion.filePath,
      documentationVersion: existing?.documentationVersion || '',
      lastDocumentationUpdate: existing?.lastDocumentationUpdate || '',
      hash: componentVersion.contentHash,
      size: componentVersion.size,
      exports: componentVersion.exports,
      status: componentVersion.status,
      history: [
        ...(existing?.history || []),
        ...(existing?.currentVersion !== componentVersion.version ? [{
          version: componentVersion.version,
          date: now,
          changes: [this.determineChangeType(existing?.currentVersion, componentVersion.version)],
          breaking: this.isBreakingChange(existing?.currentVersion, componentVersion.version),
          migrationRequired: this.isBreakingChange(existing?.currentVersion, componentVersion.version),
          notes: existing ? `Updated from ${existing.currentVersion}` : 'Initial version'
        }] : [])
      ]
    }
  }

  /**
   * Mark documentation as updated for a component
   */
  async markDocumentationUpdated(componentName: string, version: string): Promise<void> {
    await this.initialize()
    
    if (this.registry[componentName]) {
      this.registry[componentName].documentationVersion = version
      this.registry[componentName].lastDocumentationUpdate = new Date().toISOString()
    }
  }

  /**
   * Compare current registry with component versions to find outdated documentation
   */
  async compareVersions(componentVersions: ComponentVersion[]): Promise<VersionComparisonResult[]> {
    await this.initialize()
    
    const results: VersionComparisonResult[] = []
    
    for (const component of componentVersions) {
      const registryEntry = this.registry[component.name]
      const result = this.createComparisonResult(component, registryEntry)
      results.push(result)
    }
    
    return results
  }

  /**
   * Get all components that need documentation updates
   */
  async getOutdatedComponents(): Promise<VersionComparisonResult[]> {
    await this.initialize()
    
    const results: VersionComparisonResult[] = []
    
    for (const [componentName, entry] of Object.entries(this.registry)) {
      if (this.needsDocumentationUpdate(entry)) {
        const result: VersionComparisonResult = {
          componentName,
          needsUpdate: true,
          versionDiff: {
            current: entry.currentVersion,
            documented: entry.documentationVersion,
            type: this.determineChangeType(entry.documentationVersion, entry.currentVersion)
          },
          reason: entry.documentationVersion ? 'version_mismatch' : 'missing_docs',
          priority: this.calculatePriority(entry.currentVersion, entry.documentationVersion),
          estimatedEffort: this.estimateEffort(entry.currentVersion, entry.documentationVersion)
        }
        results.push(result)
      }
    }
    
    return results
  }

  /**
   * Create a comparison result for a component
   */
  private createComparisonResult(
    component: ComponentVersion, 
    registryEntry: ComponentVersionEntry | undefined
  ): VersionComparisonResult {
    if (!registryEntry) {
      return {
        componentName: component.name,
        needsUpdate: true,
        versionDiff: {
          current: component.version,
          documented: '',
          type: 'major'
        },
        reason: 'missing_docs',
        priority: 'high',
        estimatedEffort: 'moderate'
      }
    }

    const versionMismatch = component.version !== registryEntry.documentationVersion
    const hashMismatch = component.contentHash !== registryEntry.hash
    
    let reason: ComparisonReason = 'up_to_date'
    if (versionMismatch) {
      reason = 'version_mismatch'
    } else if (hashMismatch) {
      reason = 'hash_mismatch'
    } else if (!registryEntry.documentationVersion) {
      reason = 'missing_docs'
    }

    return {
      componentName: component.name,
      needsUpdate: reason !== 'up_to_date',
      versionDiff: {
        current: component.version,
        documented: registryEntry.documentationVersion,
        type: this.determineChangeType(registryEntry.documentationVersion, component.version)
      },
      reason,
      priority: this.calculatePriority(component.version, registryEntry.documentationVersion),
      estimatedEffort: this.estimateEffort(component.version, registryEntry.documentationVersion)
    }
  }

  /**
   * Check if a component entry needs documentation update
   */
  private needsDocumentationUpdate(entry: ComponentVersionEntry): boolean {
    return entry.currentVersion !== entry.documentationVersion
  }

  /**
   * Determine change type between two versions
   */
  private determineChangeType(oldVersion: string | undefined, newVersion: string): ChangeType {
    if (!oldVersion) return 'major'
    
    const oldParts = oldVersion.split('.').map(Number)
    const newParts = newVersion.split('.').map(Number)
    
    if (newParts[0] > oldParts[0]) return 'major'
    if (newParts[1] > oldParts[1]) return 'minor'
    if (newParts[2] > oldParts[2]) return 'patch'
    
    return 'patch'
  }

  /**
   * Check if version change is breaking
   */
  private isBreakingChange(oldVersion: string | undefined, newVersion: string): boolean {
    return this.determineChangeType(oldVersion, newVersion) === 'major'
  }

  /**
   * Calculate update priority based on version difference
   */
  private calculatePriority(currentVersion: string, documentedVersion: string): UpdatePriority {
    const changeType = this.determineChangeType(documentedVersion, currentVersion)
    
    switch (changeType) {
      case 'major': return 'critical'
      case 'minor': return 'high'
      case 'patch': return 'medium'
      default: return 'low'
    }
  }

  /**
   * Estimate effort required for documentation update
   */
  private estimateEffort(currentVersion: string, documentedVersion: string): EffortEstimate {
    const changeType = this.determineChangeType(documentedVersion, currentVersion)
    
    switch (changeType) {
      case 'major': return 'major'
      case 'minor': return 'significant'
      case 'patch': return 'moderate'
      default: return 'minimal'
    }
  }

  /**
   * Get statistics about the registry
   */
  async getStatistics() {
    await this.initialize()
    
    const total = Object.keys(this.registry).length
    const outdated = Object.values(this.registry).filter(entry => 
      this.needsDocumentationUpdate(entry)
    ).length
    const documented = Object.values(this.registry).filter(entry => 
      entry.documentationVersion
    ).length
    
    return {
      total,
      documented,
      outdated,
      upToDate: documented - outdated,
      coverage: total > 0 ? Math.round((documented / total) * 100) : 0
    }
  }

  /**
   * Clear the registry (useful for testing)
   */
  async clear(): Promise<void> {
    this.registry = {}
    this.initialized = false
  }
}