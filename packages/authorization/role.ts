import type { PermissionSet, Permission } from './permission'
import type { RoleName, TeamId, TenantId, OrganizationId, UserId } from './types'

export interface Role {
  readonly name: RoleName
  readonly description?: string
  readonly permissions: PermissionSet
  readonly inheritsFrom?: ReadonlyArray<RoleName>
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly teamId?: TeamId
  readonly ownerId?: UserId
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface RoleAssignment {
  readonly principalId: UserId
  readonly role: RoleName
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly teamId?: TeamId
  readonly scope?: string
  readonly assignedAt?: string
  readonly assignedBy?: UserId
  readonly metadata?: Readonly<Record<string, unknown>>
}
