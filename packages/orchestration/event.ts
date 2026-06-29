import type { ExecutionState } from "./state"

export interface OrchestrationEvent {
  readonly eventId: string
  readonly orchestrationId?: string
  readonly executionId?: string
  readonly correlationId?: string
  readonly causationId?: string
  readonly type: string
  readonly state?: ExecutionState
  readonly timestamp?: string
  readonly payload?: Readonly<Record<string, unknown>>
}
