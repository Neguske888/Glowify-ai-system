import type { WorkflowContext, WorkflowDescriptor, WorkflowLifecycleState } from './types'

export interface WorkflowDefinition {
  readonly descriptor: WorkflowDescriptor
  readonly triggers: ReadonlyArray<unknown>
  readonly actions: ReadonlyArray<unknown>
  readonly conditions?: ReadonlyArray<unknown>
}

export interface Workflow {
  readonly definition: WorkflowDefinition
  start(context: WorkflowContext): Promise<WorkflowLifecycleState>
  pause(context: WorkflowContext): Promise<WorkflowLifecycleState>
  resume(context: WorkflowContext): Promise<WorkflowLifecycleState>
  cancel(context: WorkflowContext): Promise<WorkflowLifecycleState>
}
