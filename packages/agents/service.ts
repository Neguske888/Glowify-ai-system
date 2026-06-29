import type { AgentId } from './types'
import type { Agent } from './agent'
import type { AgentStateName } from './types'

export interface AgentService {
  create(agent: Agent): Promise<Agent>
  update(agent: Agent): Promise<Agent>
  get(agentId: AgentId): Promise<Agent | null>
  list(state?: AgentStateName): Promise<ReadonlyArray<Agent>>
  remove(agentId: AgentId): Promise<boolean>
}
