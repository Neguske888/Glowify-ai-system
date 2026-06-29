import type { AgentMetadata, GoalId, PlanId, PlanStatus } from './types'
import type { Step } from './step'

export interface Plan {
  readonly planId: PlanId
  readonly goalId?: GoalId
  readonly title: string
  readonly summary?: string
  readonly status: PlanStatus
  readonly steps: ReadonlyArray<Step>
  readonly metadata?: AgentMetadata
}
