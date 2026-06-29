import type { Timestamp, VersionString, IdentityId, TenantId, OrganizationId, UserId, AuthenticationLifecycleState } from "./types"

export interface IdentityMetadata {
  readonly identityId: IdentityId
  readonly userId?: UserId
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly state?: AuthenticationLifecycleState
  readonly version?: VersionString
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}

export interface IdentityContract {
  readonly metadata: IdentityMetadata
  readonly primaryEmail?: string
  readonly primaryPhone?: string
  readonly displayName?: string
}
