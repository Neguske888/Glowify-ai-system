import type { AgentMetadata, CapabilityId, ToolId } from './types'

export interface Tool {
  readonly toolId: ToolId
  readonly name: string
  readonly description?: string
  readonly category?: string
  readonly capabilityIds?: ReadonlyArray<CapabilityId>
  readonly inputDefinition?: Readonly<Record<string, unknown>>
  readonly outputDefinition?: Readonly<Record<string, unknown>>
  readonly metadata?: AgentMetadata
}
