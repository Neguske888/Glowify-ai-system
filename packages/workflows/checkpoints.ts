import type { CheckpointId, WorkflowCheckpointStatus, WorkflowContext } from './types'

export interface WorkflowCheckpoint {
  readonly id: CheckpointId
  readonly name: string
  readonly status: WorkflowCheckpointStatus
  readonly context?: WorkflowContext
}

export interface CheckpointStore {
  record(checkpoint: WorkflowCheckpoint): Promise<void>
  list(workflowId?: string): Promise<ReadonlyArray<WorkflowCheckpoint>>
}
