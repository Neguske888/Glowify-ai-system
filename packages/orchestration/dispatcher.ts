import type { ExecutionPlan } from "./execution-plan"
import type { ExecutionResult } from "./execution-result"
import type { ExecutionContext } from "./execution-context"

export interface DispatcherContract {
  readonly dispatch: (context: ExecutionContext, plan: ExecutionPlan) => Promise<ExecutionResult>
}
