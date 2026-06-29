import type { ConversationContract } from "./conversation"
import type { MemoryContract } from "./memory"

export interface AgentContract {
  readonly agentId: string
  readonly conversation?: ConversationContract
  readonly memory?: readonly MemoryContract[]
}
