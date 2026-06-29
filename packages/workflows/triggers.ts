import type { WorkflowContext, WorkflowTriggerType } from './types'

export interface WorkflowTrigger<T = unknown> {
  readonly id: string
  readonly type: WorkflowTriggerType
  matches(input: T, context: WorkflowContext): boolean | Promise<boolean>
}
