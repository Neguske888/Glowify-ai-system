import type { AgentState } from './agent-state'
import type { Capability } from './capability'
import type { AgentId, AgentMetadata, AgentVersion } from './types'

export interface Agent {
  readonly agentId: AgentId
  readonly name: string
  readonly description?: string
  readonly version?: AgentVersion
  readonly state: AgentState
  readonly capabilities?: ReadonlyArray<Capability>
  readonly metadata?: AgentMetadata
}
