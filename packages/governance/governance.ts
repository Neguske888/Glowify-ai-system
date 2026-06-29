import type { GovernanceMetadata } from "./policy"
import type { PolicySetContract } from "./policy-set"
import type { ComplianceReport } from "./compliance"
import type { AuditContract } from "./audit"

export interface GovernanceContract {
  readonly metadata: GovernanceMetadata
  readonly policySets: readonly PolicySetContract[]
  readonly compliance?: ComplianceReport
  readonly audit?: AuditContract
}
