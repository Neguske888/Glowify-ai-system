import type { WorkflowContext, WorkflowExecutionResult, ExecutionId, StepId } from './types'

export interface WorkflowExecution {
  readonly executionId: ExecutionId
  readonly workflowId: string
  readonly stepId?: StepId
  readonly context: WorkflowContext
  readonly result?: WorkflowExecutionResult
}

export interface WorkflowExecutor {
  execute(execution: WorkflowExecution): Promise<WorkflowExecutionResult>
}
