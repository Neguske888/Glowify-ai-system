import type { AuthContext, AuthenticationMethod } from '../types'

export interface LoginRequest {
  context: AuthContext
  identifier: string
  secret?: string
  method?: AuthenticationMethod
  organizationId?: string
  provider?: string
  metadata?: Record<string, unknown>
}

export interface RefreshRequest {
  context: AuthContext
  refreshToken?: string
  sessionId?: string
  provider?: string
  metadata?: Record<string, unknown>
}

export interface AuthenticatedRequest {
  context: AuthContext
  userId: string
  organizationId?: string
  sessionId?: string
  tokenId?: string
  authenticatedAt?: string | Date
  metadata?: Record<string, unknown>
}
