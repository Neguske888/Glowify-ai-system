export type AuthProviderName = 'firebase' | 'clerk' | 'auth0' | 'supabase' | 'cognito' | 'custom' | string

export type AuthenticationMethod = 'password' | 'passwordless' | 'oauth' | 'mfa' | 'api_key' | 'magic_link' | 'sso' | string

export type AuthFactor = 'email' | 'phone' | 'totp' | 'webauthn' | 'push' | string

export interface AuthContext {
  requestId: string
  tenantId: string
  organizationId?: string
  userId?: string
  provider?: AuthProviderName
  method?: AuthenticationMethod
  metadata?: Record<string, unknown>
}

export interface AuthResultMeta {
  provider?: AuthProviderName
  method?: AuthenticationMethod
  expiresInSeconds?: number
  issuedAt?: string | Date
  refreshedAt?: string | Date
}
