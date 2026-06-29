import type { AgentMetadata, Confidence } from './types'
import type { AgentContext } from './context'

export interface ReasoningRequest {
  readonly question: string
  readonly context?: AgentContext
  readonly facts?: ReadonlyArray<string>
  readonly metadata?: AgentMetadata
}

export interface ReasoningResult {
  readonly answer: string
  readonly rationale?: string
  readonly confidence?: Confidence
  readonly metadata?: AgentMetadata
}

export interface AgentReasoner {
  reason(request: ReasoningRequest): Promise<ReasoningResult>
}
