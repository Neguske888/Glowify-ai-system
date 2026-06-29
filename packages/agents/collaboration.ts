import type { AgentMetadata, CollaborationMode, CoordinationMode } from './types'
import type { Goal } from './goal'
import type { Plan } from './plan'

export interface Collaborator {
  readonly agentId: string
  readonly role?: string
  readonly capabilities?: ReadonlyArray<string>
  readonly metadata?: AgentMetadata
}

export interface CollaborationSession {
  readonly collaborationId: string
  readonly mode: CollaborationMode
  readonly coordinationMode?: CoordinationMode
  readonly participants: ReadonlyArray<Collaborator>
  readonly sharedGoals?: ReadonlyArray<Goal>
  readonly sharedPlans?: ReadonlyArray<Plan>
  readonly metadata?: AgentMetadata
}
