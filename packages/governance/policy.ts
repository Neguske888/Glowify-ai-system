import type {
  ActorId,
  ApprovalState,
  ComplianceFramework,
  GovernanceId,
  OrganizationId,
  PolicyId,
  ResourceId,
  ResourceType,
  Sensitivity,
  TenantId,
  Timestamp,
  VersionString,
} from "./types"
import type { ClassificationContract } from "./classification"
import type { RetentionPolicy } from "./retention"
import type { ConsentMetadata } from "./consent"
import type { PrivacyPolicy } from "./privacy"
import type { ResidencyPolicy } from "./residency"
import type { EncryptionPolicy } from "./encryption"
import type { DataAccessPolicy } from "./data-access"
import type { DataSharingPolicy } from "./data-sharing"
import type { AIGovernancePolicy } from "./ai-governance"
import type { ModerationPolicy } from "./moderation"
import type { SafetyPolicy } from "./safety"
import type { TrustMetadata } from "./trust"
import type { RiskMetadata } from "./risk"

export interface GovernanceMetadata {
  readonly governanceId: GovernanceId
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly actorId?: ActorId
  readonly resourceId?: ResourceId
  readonly resourceType?: ResourceType
  readonly classification?: ClassificationContract
  readonly sensitivity?: Sensitivity
  readonly complianceFrameworks?: readonly ComplianceFramework[]
  readonly approvalState?: ApprovalState
  readonly risk?: RiskMetadata
  readonly trust?: TrustMetadata
  readonly effectiveFrom?: Timestamp
  readonly effectiveUntil?: Timestamp
  readonly version?: VersionString
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}

export interface GovernancePolicy {
  readonly policyId: PolicyId
  readonly metadata: GovernanceMetadata
  readonly classification?: ClassificationContract
  readonly retention?: RetentionPolicy
  readonly consent?: ConsentMetadata
  readonly privacy?: PrivacyPolicy
  readonly residency?: ResidencyPolicy
  readonly encryption?: EncryptionPolicy
  readonly dataAccess?: DataAccessPolicy
  readonly dataSharing?: DataSharingPolicy
  readonly ai?: AIGovernancePolicy
  readonly moderation?: ModerationPolicy
  readonly safety?: SafetyPolicy
  readonly risk?: RiskMetadata
  readonly trust?: TrustMetadata
  readonly lifecycleState?: string
}
