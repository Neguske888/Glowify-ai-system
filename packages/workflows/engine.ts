import type { WorkflowContext, WorkflowExecutionResult, WorkflowId } from './types'

export interface WorkflowEngine {
  start(workflowId: WorkflowId, context: WorkflowContext): Promise<WorkflowExecutionResult>
  pause(workflowId: WorkflowId, context: WorkflowContext): Promise<WorkflowExecutionResult>
  resume(workflowId: WorkflowId, context: WorkflowContext): Promise<WorkflowExecutionResult>
  cancel(workflowId: WorkflowId, context: WorkflowContext): Promise<WorkflowExecutionResult>
  retry(workflowId: WorkflowId, context: WorkflowContext): Promise<WorkflowExecutionResult>
  compensate(workflowId: WorkflowId, context: WorkflowContext): Promise<WorkflowExecutionResult>
}
