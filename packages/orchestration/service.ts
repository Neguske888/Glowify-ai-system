import type { ExecutionContext } from "./execution-context"
import type { ExecutionPlan } from "./execution-plan"
import type { ExecutionResult } from "./execution-result"

export interface OrchestrationService {
  readonly start: (context: ExecutionContext, plan: ExecutionPlan) => Promise<ExecutionResult>
  readonly stop: (executionId: string) => Promise<void>
  readonly pause: (executionId: string) => Promise<void>
  readonly resume: (executionId: string) => Promise<void>
}
