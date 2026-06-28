import type { IdentityTenantId, IdentityTimestamp, OrganizationStatus } from '../types'

export interface Organization {
  id: string
  tenantId: IdentityTenantId
  name: string
  slug: string
  timezone: string
  currency: string
  subscriptionPlan?: string
  status?: OrganizationStatus
  createdAt: IdentityTimestamp
  updatedAt: IdentityTimestamp
}
