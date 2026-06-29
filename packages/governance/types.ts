export type GovernanceId = string
export type PolicyId = string
export type TenantId = string
export type OrganizationId = string
export type ActorId = string
export type ResourceId = string
export type ResourceType = string
export type Classification =
  | "public"
  | "internal"
  | "confidential"
  | "restricted"
  | "regulated"
export type Sensitivity = "low" | "medium" | "high" | "critical"
export type ComplianceFramework =
  | "GDPR"
  | "SOC2"
  | "ISO27001"
  | "HIPAA"
  | "PCI-DSS"
  | "custom"
export type ApprovalState = "pending" | "approved" | "rejected" | "escalated" | "expired" | "overridden"
export type RiskScore = number
export type TrustLevel = "untrusted" | "low" | "moderate" | "high" | "verified"
export type Timestamp = string
export type VersionString = string
export type PolicyLifecycleState = "draft" | "active" | "paused" | "deprecated" | "retired"
