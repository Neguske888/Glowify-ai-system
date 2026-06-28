import type { AuthProviderName } from '../types'

export interface AuthToken {
  id: string
  tenantId: string
  organizationId?: string
  userId?: string
  sessionId?: string
  provider?: AuthProviderName
  type: 'access' | 'refresh' | 'id' | 'verification' | 'reset' | string
  value?: string
  expiresAt?: string | Date
  revokedAt?: string | Date
  createdAt?: string | Date
}
