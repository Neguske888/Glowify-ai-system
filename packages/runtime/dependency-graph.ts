import type { DependencyMetadata } from "./dependency"

export interface DependencyGraph {
  readonly graphId: string
  readonly dependencies: readonly DependencyMetadata[]
}
