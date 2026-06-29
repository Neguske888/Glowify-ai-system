import type { ExecutionPlan } from "./execution-plan"
import type { ExecutionResult } from "./execution-result"
import type { ExecutionContext } from "./execution-context"

export interface OrchestratorContract {
  readonly id: string
  readonly plan: ExecutionPlan
  readonly context: ExecutionContext
  readonly execute: (context: ExecutionContext, plan: ExecutionPlan) => Promise<ExecutionResult>
}
