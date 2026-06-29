import type { ExecutionState } from "./state"
import type { CheckpointMetadata } from "./checkpoint"

export interface ExecutionResult {
  readonly executionId: string
  readonly orchestrationId?: string
  readonly state: ExecutionState
  readonly success: boolean
  readonly checkpoint?: CheckpointMetadata
  readonly output?: Readonly<Record<string, unknown>>
  readonly errors?: readonly string[]
}
