import type { ExecutionContext } from "./execution-context"
import type { ExecutionPlan } from "./execution-plan"
import type { ExecutionResult } from "./execution-result"

export interface OrchestrationMiddleware {
  readonly name: string
  readonly handle: (context: ExecutionContext, plan: ExecutionPlan, next: () => Promise<ExecutionResult>) => Promise<ExecutionResult>
}
