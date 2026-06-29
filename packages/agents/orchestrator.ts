import type { AgentMetadata } from './types'
import type { CollaborationSession } from './collaboration'

export interface OrchestrationRequest {
  readonly collaboration: CollaborationSession
  readonly context?: Readonly<Record<string, unknown>>
  readonly metadata?: AgentMetadata
}

export interface OrchestrationResult {
  readonly collaborationId: string
  readonly accepted: boolean
  readonly output?: unknown
  readonly metadata?: AgentMetadata
}

export interface AgentOrchestrator {
  orchestrate(request: OrchestrationRequest): Promise<OrchestrationResult>
}
