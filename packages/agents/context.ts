import type { AgentMetadata, ConversationId, GoalId, PlanId, SessionId, StepId, TaskId } from './types'
import type { KnowledgeItem } from './knowledge'
import type { MemoryEntry } from './memory'

export interface AgentContext {
  readonly agentId?: string
  readonly sessionId?: SessionId
  readonly conversationId?: ConversationId
  readonly goalId?: GoalId
  readonly planId?: PlanId
  readonly stepId?: StepId
  readonly taskId?: TaskId
  readonly memory?: ReadonlyArray<MemoryEntry>
  readonly knowledge?: ReadonlyArray<KnowledgeItem>
  readonly context?: Readonly<Record<string, unknown>>
  readonly metadata?: AgentMetadata
}
