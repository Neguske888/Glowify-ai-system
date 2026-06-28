import type { IdentityTenantId, IdentityTimestamp } from '../types'

export interface Permission {
  id: string
  tenantId?: IdentityTenantId
  key: string
  name: string
  description?: string
  group?: string
  isSystem?: boolean
  createdAt?: IdentityTimestamp
  updatedAt?: IdentityTimestamp
}
