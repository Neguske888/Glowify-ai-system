export type WorkflowId = string
export type WorkflowName = string
export type WorkflowVersion = string
export type ExecutionId = string
export type StepId = string
export type TriggerId = string
export type ActionId = string
export type ConditionId = string
export type CheckpointId = string
export type CompensationId = string
export type CorrelationId = string
export type TenantId = string

export type WorkflowLifecycleState = 'draft' | 'active' | 'paused' | 'running' | 'completed' | 'failed' | 'cancelled'
export type WorkflowTriggerType = 'event' | 'schedule' | 'webhook' | 'manual' | 'condition'
export type WorkflowActionType = 'AI' | 'notification' | 'payment' | 'commerce' | 'analytics' | 'custom'
export type WorkflowExecutionOutcome = 'started' | 'paused' | 'resumed' | 'cancelled' | 'retried' | 'compensated' | 'completed' | 'failed'
export type WorkflowConditionOutcome = 'passed' | 'failed' | 'pending'
export type WorkflowCheckpointStatus = 'pending' | 'reached' | 'skipped' | 'rolled-back'

export interface WorkflowContext {
  readonly workflowId: WorkflowId
  readonly workflowName: WorkflowName
  readonly workflowVersion: WorkflowVersion
  readonly tenantId: TenantId
  readonly executionId?: ExecutionId
  readonly correlationId?: CorrelationId
  readonly metadata?: Record<string, unknown>
}

export interface WorkflowDescriptor {
  readonly id: WorkflowId
  readonly name: WorkflowName
  readonly version: WorkflowVersion
  readonly state: WorkflowLifecycleState
  readonly description?: string
  readonly tags?: ReadonlyArray<string>
}

export interface WorkflowExecutionResult {
  readonly executionId: ExecutionId
  readonly outcome: WorkflowExecutionOutcome
  readonly state: WorkflowLifecycleState
  readonly message?: string
}

export interface WorkflowStateSnapshot {
  readonly executionId: ExecutionId
  readonly state: WorkflowLifecycleState
  readonly stepId?: StepId
  readonly updatedAt: string
  readonly data?: Record<string, unknown>
}
