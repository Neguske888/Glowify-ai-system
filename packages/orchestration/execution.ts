import type { ExecutionState } from "./state"
import type { ExecutionContext } from "./execution-context"
import type { ExecutionPolicy } from "./execution-policy"

export interface ExecutionMetadata {
  readonly orchestrationId?: string
  readonly executionId?: string
  readonly correlationId?: string
  readonly causationId?: string
  readonly tenantId?: string
  readonly organizationId?: string
  readonly workflowId?: string
  readonly pipelineId?: string
  readonly taskId?: string
  readonly actorId?: string
  readonly agentId?: string
  readonly extensionId?: string
  readonly priority?: string
  readonly executionMode?: string
  readonly version?: string
  readonly createdAt?: string
  readonly updatedAt?: string
}

export interface ExecutionContract {
  readonly metadata: ExecutionMetadata
  readonly state: ExecutionState
  readonly context: ExecutionContext
  readonly policy?: ExecutionPolicy
}
