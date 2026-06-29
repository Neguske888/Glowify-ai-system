export interface DependencyMetadata {
  readonly dependencyId: string
  readonly name: string
  readonly versionRange?: string
  readonly optional?: boolean
}
