import type { WorkflowContext } from './types'

export interface CompensationResult {
  readonly success: boolean
  readonly reason?: string
}

export interface WorkflowCompensation<T = unknown> {
  readonly id: string
  compensate(input: { context: WorkflowContext; payload?: T }): Promise<CompensationResult>
}
