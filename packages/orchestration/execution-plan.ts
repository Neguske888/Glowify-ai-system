import type { CommandContract } from "./command"
import type { TaskContract } from "./task"
import type { PipelineContract } from "./pipeline"
import type { ExecutionPolicy } from "./execution-policy"

export interface ExecutionPlan {
  readonly id: string
  readonly workflowId?: string
  readonly pipelineId?: string
  readonly commands: readonly CommandContract[]
  readonly tasks: readonly TaskContract[]
  readonly pipelines: readonly PipelineContract[]
  readonly policy?: ExecutionPolicy
}
