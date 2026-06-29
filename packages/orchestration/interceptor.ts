import type { ExecutionContext } from "./execution-context"
import type { ExecutionPlan } from "./execution-plan"

export interface OrchestrationInterceptor {
  readonly name: string
  readonly before?: (context: ExecutionContext, plan: ExecutionPlan) => void
  readonly after?: (context: ExecutionContext, plan: ExecutionPlan) => void
}
