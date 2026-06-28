import type { HealthStatus, RequestContext, Result } from '../../contracts'

export interface ExecuteWorkflowInput {
  context: RequestContext
  workflowId: string
  payload?: Record<string, unknown>
}

export interface ScheduleWorkflowInput {
  context: RequestContext
  workflowId: string
  runAt: string
  payload?: Record<string, unknown>
}

export interface CancelWorkflowInput {
  context: RequestContext
  workflowId: string
  jobId?: string
}

export interface RetryWorkflowInput {
  context: RequestContext
  workflowId: string
  jobId: string
}

export interface AutomationExecutionOutput {
  jobId: string
  status: 'queued' | 'running' | 'completed' | 'failed'
}

export interface AutomationService {
  executeWorkflow(input: ExecuteWorkflowInput): Promise<Result<AutomationExecutionOutput>>
  schedule(input: ScheduleWorkflowInput): Promise<Result<AutomationExecutionOutput>>
  cancel(input: CancelWorkflowInput): Promise<Result<boolean>>
  retry(input: RetryWorkflowInput): Promise<Result<AutomationExecutionOutput>>
  healthCheck(context: RequestContext): Promise<Result<HealthStatus>>
}
