import type { AuthProviderName } from '../types'

export interface AuthSession {
  id: string
  tenantId: string
  organizationId?: string
  userId: string
  provider?: AuthProviderName
  createdAt: string | Date
  expiresAt: string | Date
  revokedAt?: string | Date
  refreshable?: boolean
  device?: string
  ipAddress?: string
  userAgent?: string
}
