import type { ExecutionPlan } from "./execution-plan"
import type { ExecutionContext } from "./execution-context"

export interface CoordinationContract {
  readonly name: string
  readonly coordinate: (context: ExecutionContext, plan: ExecutionPlan) => Readonly<Record<string, unknown>>
}
