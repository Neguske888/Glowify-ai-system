import type { AgentMetadata, ConversationId, SessionId, Timestamp } from './types'
import type { Message } from './message'

export interface Conversation {
  readonly conversationId: ConversationId
  readonly sessionId?: SessionId
  readonly title?: string
  readonly messages: ReadonlyArray<Message>
  readonly createdAt?: Timestamp
  readonly metadata?: AgentMetadata
}
