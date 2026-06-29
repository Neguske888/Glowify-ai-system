import type { AgentMetadata, GoalId, PlanId, Priority, TaskId, TaskStatus, Timestamp } from './types'

export interface Task {
  readonly taskId: TaskId
  readonly goalId?: GoalId
  readonly planId?: PlanId
  readonly title: string
  readonly description?: string
  readonly status: TaskStatus
  readonly priority?: Priority
  readonly dueAt?: Timestamp
  readonly input?: Readonly<Record<string, unknown>>
  readonly metadata?: AgentMetadata
}
