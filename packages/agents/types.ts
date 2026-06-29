export type AgentId = string
export type AgentVersion = string
export type SessionId = string
export type ConversationId = string
export type GoalId = string
export type PlanId = string
export type StepId = string
export type TaskId = string
export type ToolId = string
export type ToolExecutionId = string
export type MemoryId = string
export type KnowledgeSourceId = string
export type CapabilityId = string
export type PolicyId = string
export type RegistryId = string
export type RepositoryId = string
export type ServiceId = string
export type Timestamp = string
export type Score = number
export type Confidence = number
export type Priority = 'low' | 'normal' | 'high' | 'critical'
export type AgentStateName = 'idle' | 'initializing' | 'planning' | 'reasoning' | 'executing' | 'waiting' | 'paused' | 'suspended' | 'error' | 'completed'
export type TaskStatus = 'pending' | 'queued' | 'running' | 'blocked' | 'succeeded' | 'failed' | 'cancelled'
export type GoalStatus = 'draft' | 'active' | 'achieved' | 'blocked' | 'abandoned'
export type PlanStatus = 'draft' | 'ready' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled'
export type StepStatus = 'pending' | 'running' | 'succeeded' | 'failed' | 'skipped'
export type SessionStatus = 'open' | 'active' | 'idle' | 'closed' | 'archived'
export type ConversationRole = 'system' | 'user' | 'assistant' | 'tool' | 'agent' | 'coordinator'
export type MemoryScope = 'working' | 'session' | 'long-term'
export type ToolInvocationMode = 'direct' | 'scheduled' | 'delegated'
export type KnowledgeSourceKind = 'document' | 'dataset' | 'event' | 'note' | 'memory' | 'graph' | 'api' | 'custom'
export type CollaborationMode = 'independent' | 'cooperative' | 'supervised' | 'swarm'
export type CoordinationMode = 'centralized' | 'decentralized' | 'hybrid'
export type EvaluationOutcome = 'pass' | 'partial' | 'fail' | 'unknown'
export type PolicyEffect = 'allow' | 'deny' | 'defer'
export type ReflectionDepth = 'shallow' | 'standard' | 'deep'
export type AgentAttributes = Readonly<Record<string, unknown>>

export interface AgentMetadata {
  readonly tenantId?: string
  readonly agentId?: AgentId
  readonly sessionId?: SessionId
  readonly conversationId?: ConversationId
  readonly goalId?: GoalId
  readonly planId?: PlanId
  readonly stepId?: StepId
  readonly taskId?: TaskId
  readonly requestId?: string
  readonly correlationId?: string
  readonly timestamp?: Timestamp
  readonly labels?: ReadonlyArray<string>
  readonly attributes?: AgentAttributes
}
