import type { AgentMetadata } from './types'
import type { CollaborationSession } from './collaboration'

export interface CoordinationRequest {
  readonly collaboration: CollaborationSession
  readonly objective?: string
  readonly metadata?: AgentMetadata
}

export interface CoordinationResult {
  readonly collaborationId: string
  readonly coordinated: boolean
  readonly notes?: string
  readonly metadata?: AgentMetadata
}

export interface AgentCoordinator {
  coordinate(request: CoordinationRequest): Promise<CoordinationResult>
}
