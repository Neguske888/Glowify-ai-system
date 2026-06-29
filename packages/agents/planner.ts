import type { AgentMetadata } from './types'
import type { Goal } from './goal'
import type { Plan } from './plan'

export interface PlanningRequest {
  readonly goal: Goal
  readonly context?: Readonly<Record<string, unknown>>
  readonly constraints?: ReadonlyArray<string>
  readonly metadata?: AgentMetadata
}

export interface PlanningResult {
  readonly plan: Plan
  readonly confidence?: number
  readonly metadata?: AgentMetadata
}

export interface AgentPlanner {
  plan(request: PlanningRequest): Promise<PlanningResult>
}
