import type { IdentityTenantId, IdentityTimestamp, UserStatus } from '../types'

export interface User {
  id: string
  tenantId: IdentityTenantId
  email: string
  displayName?: string
  avatarUrl?: string
  status: UserStatus
  createdAt: IdentityTimestamp
  updatedAt: IdentityTimestamp
}
