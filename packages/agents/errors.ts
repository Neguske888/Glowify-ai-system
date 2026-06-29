export type AgentErrorCode = 'agent-not-found' | 'agent-inactive' | 'plan-unavailable' | 'task-unavailable' | 'tool-unavailable' | 'memory-unavailable' | 'knowledge-unavailable' | 'coordination-failed' | 'evaluation-failed' | 'policy-denied' | 'execution-failed'

export interface AgentError {
  readonly code: AgentErrorCode
  readonly message: string
  readonly agentId?: string
  readonly sessionId?: string
  readonly details?: Readonly<Record<string, unknown>>
}

export interface AgentFailure {
  readonly error: AgentError
  readonly recoverable: boolean
  readonly metadata?: Readonly<Record<string, unknown>>
}
