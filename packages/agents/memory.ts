import type { AgentMetadata, ConversationId, MemoryId, MemoryScope, SessionId, Timestamp } from './types'

export interface MemoryEntry {
  readonly memoryId: MemoryId
  readonly scope: MemoryScope
  readonly key?: string
  readonly value: unknown
  readonly agentId?: string
  readonly sessionId?: SessionId
  readonly conversationId?: ConversationId
  readonly createdAt?: Timestamp
  readonly metadata?: AgentMetadata
}

export interface MemoryQuery {
  readonly memoryId?: MemoryId
  readonly agentId?: string
  readonly sessionId?: SessionId
  readonly conversationId?: ConversationId
  readonly scope?: MemoryScope
  readonly key?: string
  readonly limit?: number
  readonly cursor?: string
  readonly metadata?: AgentMetadata
}
