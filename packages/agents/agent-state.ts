import type { AgentMetadata, AgentStateName, Timestamp } from './types'

export type { AgentStateName } from './types'

export interface AgentState {
  readonly name: AgentStateName
  readonly enteredAt?: Timestamp
  readonly updatedAt?: Timestamp
  readonly reason?: string
  readonly metadata?: AgentMetadata
}

export interface AgentStateTransition {
  readonly from: AgentStateName
  readonly to: AgentStateName
  readonly at?: Timestamp
  readonly reason?: string
  readonly metadata?: AgentMetadata
}
