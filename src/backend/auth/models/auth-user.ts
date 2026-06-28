import type { AuthProviderName } from '../types'

export interface AuthUser {
  id: string
  tenantId: string
  organizationId?: string
  email: string
  displayName?: string
  phoneNumber?: string
  avatarUrl?: string
  isVerified?: boolean
  providers: AuthProviderName[]
  createdAt: string | Date
  updatedAt: string | Date
}
