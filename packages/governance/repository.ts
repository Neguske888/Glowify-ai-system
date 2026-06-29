import type { GovernanceContract } from "./governance"
import type { GovernancePolicy } from "./policy"

export interface GovernanceRepository {
  readonly findGovernanceById: (governanceId: string) => Promise<GovernanceContract | null>
  readonly findPolicyById: (policyId: string) => Promise<GovernancePolicy | null>
}
