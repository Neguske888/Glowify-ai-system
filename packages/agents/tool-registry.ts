import type { AgentMetadata, ToolId } from './types'
import type { Tool } from './tool'

export interface ToolRegistration {
  readonly tool: Tool
  readonly enabled: boolean
  readonly metadata?: AgentMetadata
}

export interface ToolRegistry {
  register(tool: Tool): Promise<ToolRegistration>
  resolve(toolId: ToolId): Promise<Tool | null>
  list(): Promise<ReadonlyArray<ToolRegistration>>
  remove(toolId: ToolId): Promise<boolean>
}
