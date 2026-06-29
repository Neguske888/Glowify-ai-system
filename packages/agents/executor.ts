import type { Agent } from './agent'
import type { AgentId, AgentMetadata, SessionId } from './types'
import type { Task } from './task'
import type { TaskResult } from './task-result'

export interface ExecutionRequest {
  readonly agentId: AgentId
  readonly sessionId?: SessionId
  readonly task?: Task
  readonly context?: Readonly<Record<string, unknown>>
  readonly metadata?: AgentMetadata
}

export interface ExecutionResult {
  readonly agent: Agent
  readonly taskResults: ReadonlyArray<TaskResult>
  readonly output?: unknown
  readonly metadata?: AgentMetadata
}

export interface AgentExecutor {
  execute(request: ExecutionRequest): Promise<ExecutionResult>
}
