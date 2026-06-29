import type { GoalId, GoalStatus, AgentMetadata, Timestamp } from './types'

export interface Goal {
  readonly goalId: GoalId
  readonly title: string
  readonly description?: string
  readonly status: GoalStatus
  readonly successCriteria?: ReadonlyArray<string>
  readonly dueAt?: Timestamp
  readonly metadata?: AgentMetadata
}
