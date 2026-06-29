import type { GovernanceContract } from "./governance"
import type { GovernancePolicy } from "./policy"
import type { PolicyEvaluationResult } from "./rule"

export interface GovernanceService {
  readonly evaluatePolicy: (policy: GovernancePolicy) => Promise<PolicyEvaluationResult>
  readonly describeGovernance: (governanceId: string) => Promise<GovernanceContract | null>
}
