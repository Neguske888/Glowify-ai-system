import type { Result, RequestContext } from '../../contracts'
import type { AuthToken } from '../models/auth-token'

export interface TokenIssueRequest {
  context: RequestContext
  token: Omit<AuthToken, 'id' | 'createdAt'>
}

export interface TokenValidateRequest {
  context: RequestContext
  token: string
  type?: AuthToken['type']
}

export interface TokenRevokeRequest {
  context: RequestContext
  tokenId?: string
  token?: string
  reason?: string
}

export interface TokenProvider {
  issue(input: TokenIssueRequest): Promise<Result<AuthToken>>
  validate(input: TokenValidateRequest): Promise<Result<AuthToken>>
  revoke(input: TokenRevokeRequest): Promise<Result<void>>
}
