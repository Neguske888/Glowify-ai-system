import type { AgentContract } from "./agent"

export interface AgentSessionContract {
  readonly agentSessionId: string
  readonly agent: AgentContract
  readonly active?: boolean
}
