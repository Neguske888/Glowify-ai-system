import type { MessageContract } from "./message"

export interface ConversationContract {
  readonly conversationId: string
  readonly messages: readonly MessageContract[]
  readonly title?: string
  readonly summary?: string
}
