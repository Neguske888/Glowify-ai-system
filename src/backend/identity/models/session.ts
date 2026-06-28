import type { IdentityTimestamp } from '../types'

export interface Session {
  id: string
  userId: string
  organizationId: string
  createdAt: IdentityTimestamp
  expiresAt: IdentityTimestamp
  revokedAt?: IdentityTimestamp
  device?: string
  ipAddress?: string
  userAgent?: string
}
