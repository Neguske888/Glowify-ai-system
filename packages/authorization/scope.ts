import type { OrganizationId, ScopeId, TeamId, TenantId, UserId } from './types'

export interface Scope {
  readonly scopeId: ScopeId
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly teamId?: TeamId
  readonly ownerId?: UserId
  readonly type: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface TenantScope extends Scope {
  readonly type: 'tenant'
  readonly tenantId: TenantId
}

export interface OrganizationScope extends Scope {
  readonly type: 'organization'
  readonly tenantId: TenantId
  readonly organizationId: OrganizationId
}

export interface TeamScope extends Scope {
  readonly type: 'team'
  readonly tenantId: TenantId
  readonly organizationId?: OrganizationId
  readonly teamId: TeamId
}

export interface OwnershipScope extends Scope {
  readonly type: 'ownership'
  readonly ownerId: UserId
}
