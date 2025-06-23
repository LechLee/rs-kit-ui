/**
 * Version Registry Schema
 * 
 * Defines the structure for tracking component versions and documentation sync status
 */

export interface ComponentVersionRegistry {
  [componentName: string]: ComponentVersionEntry
}

export interface ComponentVersionEntry {
  /** Current version of the component */
  currentVersion: string
  /** Last modification timestamp */
  lastModified: string
  /** Path to the component file */
  filePath: string
  /** Version of the documentation */
  documentationVersion: string
  /** Last documentation update timestamp */
  lastDocumentationUpdate: string
  /** File content hash for additional verification */
  hash: string
  /** File size in bytes */
  size: number
  /** List of exported items from the component */
  exports: string[]
  /** Component status */
  status: ComponentStatus
  /** Version history */
  history: VersionHistoryEntry[]
}

export interface VersionHistoryEntry {
  version: string
  date: string
  changes: ChangeType[]
  breaking: boolean
  migrationRequired: boolean
  notes?: string
}

export type ChangeType = 
  | 'major'
  | 'minor'
  | 'patch'
  | 'prerelease'

export type ComponentStatus = 
  | 'stable'
  | 'beta'
  | 'alpha'
  | 'deprecated'
  | 'experimental'

export interface VersionComparisonResult {
  componentName: string
  needsUpdate: boolean
  versionDiff: {
    current: string
    documented: string
    type: ChangeType
  }
  reason: ComparisonReason
  priority: UpdatePriority
  estimatedEffort: EffortEstimate
}

export type ComparisonReason = 
  | 'version_mismatch'
  | 'hash_mismatch'
  | 'missing_docs'
  | 'stale_docs'
  | 'up_to_date'

export type UpdatePriority = 
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'

export type EffortEstimate = 
  | 'minimal'
  | 'moderate'
  | 'significant'
  | 'major'

export interface ComponentVersion {
  name: string
  version: string
  lastModified: string
  filePath: string
  contentHash: string
  size: number
  exports: string[]
  status: ComponentStatus
}