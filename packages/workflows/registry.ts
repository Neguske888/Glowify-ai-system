import type { WorkflowDescriptor, WorkflowId } from './types'
import type { Workflow } from './workflow'

export interface WorkflowRegistration {
  readonly descriptor: WorkflowDescriptor
  readonly workflow: Workflow
}

export interface WorkflowRegistry {
  register(registration: WorkflowRegistration): void
  get(workflowId: WorkflowId): WorkflowRegistration | undefined
  remove(workflowId: WorkflowId): boolean
  list(): ReadonlyArray<WorkflowRegistration>
}
