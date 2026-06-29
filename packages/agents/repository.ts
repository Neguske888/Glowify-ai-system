import type { AgentId } from './types'
import type { Agent } from './agent'
import type { AgentStateName } from './types'

export interface AgentRepository {
  save(agent: Agent): Promise<Agent>
  findById(agentId: AgentId): Promise<Agent | null>
  listByState(state?: AgentStateName): Promise<ReadonlyArray<Agent>>
  delete(agentId: AgentId): Promise<boolean>
}
