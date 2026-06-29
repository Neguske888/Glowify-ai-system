import type { AgentMetadata, Score, TaskId, TaskStatus } from './types'

export interface TaskResult {
  readonly taskId: TaskId
  readonly status: TaskStatus
  readonly output?: unknown
  readonly score?: Score
  readonly error?: string
  readonly metadata?: AgentMetadata
}
