import type { ActorId, GovernanceId, OrganizationId, PolicyId, ResourceId, ResourceType, TenantId, Timestamp } from "./types"

export interface AuditRecord {
  readonly auditId: string
  readonly governanceId?: GovernanceId
  readonly policyId?: PolicyId
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly actorId?: ActorId
  readonly resourceId?: ResourceId
  readonly resourceType?: ResourceType
  readonly action: string
  readonly outcome: string
  readonly message?: string
  readonly createdAt?: Timestamp
}
