import type { IdentityTenantId, IdentityTimestamp } from '../types'

export interface PermissionAssignment {
  permissionId: string
  allowed?: boolean
  scope?: string
}

export interface Role {
  id: string
  tenantId: IdentityTenantId
  organizationId?: string
  name: string
  description?: string
  isSystem?: boolean
  permissions: PermissionAssignment[]
  createdAt: IdentityTimestamp
  updatedAt: IdentityTimestamp
}
