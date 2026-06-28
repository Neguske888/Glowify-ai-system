export type IdentityEntityId = string
export type IdentityTenantId = string
export type IdentityTimestamp = string | Date

export type UserStatus = 'active' | 'inactive' | 'disabled' | 'invited' | 'archived'
export type OrganizationStatus = 'active' | 'suspended' | 'archived'
export type MembershipStatus = 'active' | 'invited' | 'suspended' | 'removed'
export type SessionStatus = 'active' | 'revoked' | 'expired'

export interface IdentityListOptions {
  limit?: number
  cursor?: string
  search?: string
  includeArchived?: boolean
}

export interface IdentityListResult<T> {
  items: T[]
  nextCursor?: string
  total?: number
}
