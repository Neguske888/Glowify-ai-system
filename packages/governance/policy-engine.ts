import type { GovernancePolicy } from "./policy"
import type { PolicyEvaluationResult } from "./rule"

export interface PolicyEngineContract {
  readonly engineId: string
  readonly evaluate: (policy: GovernancePolicy) => PolicyEvaluationResult
}
