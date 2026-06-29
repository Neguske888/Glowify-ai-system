import type { AgentId } from './types'
import type { Agent } from './agent'

export interface AgentRegistry {
  register(agent: Agent): Promise<Agent>
  resolve(agentId: AgentId): Promise<Agent | null>
  list(): Promise<ReadonlyArray<Agent>>
  remove(agentId: AgentId): Promise<boolean>
}
