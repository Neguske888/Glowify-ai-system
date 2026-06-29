import type { AgentMetadata, CapabilityId } from './types'

export interface Capability {
  readonly capabilityId: CapabilityId
  readonly name: string
  readonly description?: string
  readonly category?: string
  readonly enabled?: boolean
  readonly metadata?: AgentMetadata
}
