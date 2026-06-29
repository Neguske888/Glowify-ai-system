import type { AgentMetadata, ToolExecutionId, ToolId } from './types'

export interface ToolExecutionRequest {
  readonly toolId: ToolId
  readonly input?: Readonly<Record<string, unknown>>
  readonly metadata?: AgentMetadata
}

export interface ToolExecutionRecord {
  readonly toolExecutionId: ToolExecutionId
  readonly toolId: ToolId
  readonly success: boolean
  readonly output?: unknown
  readonly error?: string
  readonly metadata?: AgentMetadata
}

export interface ToolExecutor {
  execute(request: ToolExecutionRequest): Promise<ToolExecutionRecord>
}
