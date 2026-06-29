import type { AgentMetadata, TaskId } from './types'
import type { Task } from './task'

export interface TaskQueueItem {
  readonly task: Task
  readonly enqueuedAt?: string
  readonly metadata?: AgentMetadata
}

export interface TaskQueue {
  enqueue(task: Task): Promise<TaskQueueItem>
  dequeue(taskId?: TaskId): Promise<TaskQueueItem | null>
  peek(taskId?: TaskId): Promise<TaskQueueItem | null>
  list(agentId?: string): Promise<ReadonlyArray<TaskQueueItem>>
}
