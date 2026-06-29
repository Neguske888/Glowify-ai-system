import type { ExecutionContract } from "./execution"
import type { ExecutionPlan } from "./execution-plan"

export interface OrchestrationRepository {
  readonly findExecutionById: (executionId: string) => Promise<ExecutionContract | null>
  readonly findPlanById: (planId: string) => Promise<ExecutionPlan | null>
}
