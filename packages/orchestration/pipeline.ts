import type { StageContract } from "./stage"

export interface PipelineContract {
  readonly pipelineId: string
  readonly name: string
  readonly stages: readonly StageContract[]
}
