import type { ExecutionId, WorkflowLifecycleState, WorkflowStateSnapshot } from './types'

export interface WorkflowStateStore {
  get(executionId: ExecutionId): Promise<WorkflowStateSnapshot | undefined>
  set(snapshot: WorkflowStateSnapshot): Promise<void>
  update(executionId: ExecutionId, state: WorkflowLifecycleState, data?: Record<string, unknown>): Promise<void>
  delete(executionId: ExecutionId): Promise<boolean>
}
