import type { Result, RequestContext } from '../../contracts'

export interface OAuthProviderAuthorizationRequest {
  context: RequestContext
  provider: string
  redirectUri?: string
  scopes?: string[]
  state?: string
  metadata?: Record<string, unknown>
}

export interface OAuthProviderCodeExchangeRequest {
  context: RequestContext
  provider: string
  code: string
  redirectUri?: string
  state?: string
  metadata?: Record<string, unknown>
}

export interface OAuthProviderRevokeRequest {
  context: RequestContext
  provider: string
  token?: string
  refreshToken?: string
  metadata?: Record<string, unknown>
}

export interface OAuthProvider {
  authenticate(input: OAuthProviderAuthorizationRequest): Promise<Result<unknown>>
  exchangeCode(input: OAuthProviderCodeExchangeRequest): Promise<Result<unknown>>
  revoke(input: OAuthProviderRevokeRequest): Promise<Result<void>>
}
