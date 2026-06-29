export type WorkflowErrorCode =
  | 'WORKFLOW_NOT_FOUND'
  | 'WORKFLOW_INVALID_STATE'
  | 'WORKFLOW_EXECUTION_FAILED'
  | 'WORKFLOW_RETRY_EXHAUSTED'
  | 'WORKFLOW_COMPENSATION_FAILED'

export interface WorkflowError {
  readonly code: WorkflowErrorCode
  readonly message: string
  readonly cause?: unknown
}
