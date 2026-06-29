import type { AgentMetadata } from './types'

export interface WorkflowAdapterRequest {
  readonly workflowId: string
  readonly payload?: Readonly<Record<string, unknown>>
  readonly metadata?: AgentMetadata
}

export interface WorkflowAdapterResult {
  readonly workflowId: string
  readonly accepted: boolean
  readonly result?: unknown
  readonly metadata?: AgentMetadata
}

export interface WorkflowAdapter {
  execute(request: WorkflowAdapterRequest): Promise<WorkflowAdapterResult>
}
