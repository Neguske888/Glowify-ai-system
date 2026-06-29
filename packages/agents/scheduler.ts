import type { AgentMetadata, SessionId, Timestamp } from './types'
import type { Plan } from './plan'
import type { Task } from './task'

export interface ScheduleRequest {
  readonly plan?: Plan
  readonly task?: Task
  readonly runAt?: Timestamp
  readonly sessionId?: SessionId
  readonly metadata?: AgentMetadata
}

export interface ScheduleEntry {
  readonly scheduledAt: Timestamp
  readonly runAt?: Timestamp
  readonly metadata?: AgentMetadata
}

export interface AgentScheduler {
  schedule(request: ScheduleRequest): Promise<ScheduleEntry>
  cancel(scheduleId: string): Promise<boolean>
}
