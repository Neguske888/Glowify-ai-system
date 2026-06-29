import type { WorkflowContext, WorkflowId } from './types'

export interface WorkflowSchedule {
  readonly workflowId: WorkflowId
  readonly runAt: string
  readonly context?: WorkflowContext
  readonly cron?: string
}

export interface WorkflowScheduler {
  schedule(schedule: WorkflowSchedule): Promise<string>
  unschedule(workflowId: WorkflowId): Promise<boolean>
  list(): ReadonlyArray<WorkflowSchedule>
}
