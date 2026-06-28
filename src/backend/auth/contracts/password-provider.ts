import type { Result, RequestContext } from '../../contracts'

export interface PasswordHashRequest {
  context: RequestContext
  password: string
  metadata?: Record<string, unknown>
}

export interface PasswordCompareRequest {
  context: RequestContext
  password: string
  hash: string
  metadata?: Record<string, unknown>
}

export interface PasswordStrengthRequest {
  context: RequestContext
  password: string
  metadata?: Record<string, unknown>
}

export interface PasswordProvider {
  hash(input: PasswordHashRequest): Promise<Result<{ hash: string }>>
  compare(input: PasswordCompareRequest): Promise<Result<{ matches: boolean }>>
  validateStrength(input: PasswordStrengthRequest): Promise<Result<{ strong: boolean; score?: number; reasons?: string[] }>>
}
