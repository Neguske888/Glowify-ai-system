import type { AgentMetadata, PlanId, StepId, StepStatus, TaskId } from './types'

export interface Step {
  readonly stepId: StepId
  readonly planId?: PlanId
  readonly taskId?: TaskId
  readonly title: string
  readonly description?: string
  readonly status: StepStatus
  readonly order: number
  readonly dependsOn?: ReadonlyArray<StepId>
  readonly metadata?: AgentMetadata
}
