import type { WorkflowContext } from './types'

export interface WorkflowActionInput<T = unknown> {
  readonly context: WorkflowContext
  readonly payload: T
}

export interface WorkflowActionResult {
  readonly success: boolean
  readonly message?: string
  readonly data?: Record<string, unknown>
}

export interface WorkflowAction<TInput = unknown, TResult = WorkflowActionResult> {
  readonly id: string
  readonly type: string
  execute(input: WorkflowActionInput<TInput>): Promise<TResult>
}
