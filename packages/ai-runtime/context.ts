import type { ConversationContract } from "./conversation"

export interface ContextWindowContract {
  readonly conversation: ConversationContract
  readonly maxTokens?: number
  readonly truncated?: boolean
}
