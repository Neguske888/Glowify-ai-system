import type { AgentMetadata, ConversationRole, Timestamp } from './types'

export interface Message {
  readonly messageId: string
  readonly role: ConversationRole
  readonly content: string
  readonly authorId?: string
  readonly createdAt?: Timestamp
  readonly metadata?: AgentMetadata
}
