import type { WorkflowConditionOutcome, WorkflowContext } from './types'

export interface WorkflowConditionInput<T = unknown> {
  readonly context: WorkflowContext
  readonly payload?: T
}

export interface WorkflowConditionResult {
  readonly outcome: WorkflowConditionOutcome
  readonly reason?: string
}

export interface WorkflowCondition<T = unknown> {
  readonly id: string
  evaluate(input: WorkflowConditionInput<T>): Promise<WorkflowConditionResult>
}
