import type { ExecutionMetadata } from "./execution"
import type { PriorityLevel } from "./types"

export interface ExecutionContext {
  readonly metadata: ExecutionMetadata
  readonly priority?: PriorityLevel
  readonly executionMode?: string
  readonly trace?: Readonly<Record<string, unknown>>
  readonly variables?: Readonly<Record<string, unknown>>
}
