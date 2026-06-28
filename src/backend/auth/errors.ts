export interface AuthError extends Error {
  code: string
  category: 'validation' | 'authentication' | 'authorization' | 'token' | 'session' | 'provider' | 'system'
  retriable?: boolean
  details?: Record<string, unknown>
}

export interface InvalidCredentialsError extends AuthError {
  code: 'INVALID_CREDENTIALS'
}

export interface AuthenticationRequiredError extends AuthError {
  code: 'AUTHENTICATION_REQUIRED'
}

export interface AuthenticationFailedError extends AuthError {
  code: 'AUTHENTICATION_FAILED'
}

export interface TokenExpiredError extends AuthError {
  code: 'TOKEN_EXPIRED'
}

export interface InvalidTokenError extends AuthError {
  code: 'INVALID_TOKEN'
}

export interface SessionRevokedError extends AuthError {
  code: 'SESSION_REVOKED'
}

export interface PasswordTooWeakError extends AuthError {
  code: 'PASSWORD_TOO_WEAK'
}

export interface UnsupportedProviderError extends AuthError {
  code: 'UNSUPPORTED_PROVIDER'
}

export type AuthDomainError =
  | InvalidCredentialsError
  | AuthenticationRequiredError
  | AuthenticationFailedError
  | TokenExpiredError
  | InvalidTokenError
  | SessionRevokedError
  | PasswordTooWeakError
  | UnsupportedProviderError
