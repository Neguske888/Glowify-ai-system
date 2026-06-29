import type { AgentMetadata, SessionId, SessionStatus, Timestamp } from './types'

export interface Session {
  readonly sessionId: SessionId
  readonly agentId?: string
  readonly status: SessionStatus
  readonly startedAt?: Timestamp
  readonly endedAt?: Timestamp
  readonly metadata?: AgentMetadata
}
