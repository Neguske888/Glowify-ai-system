export type AuthorizationErrorCode =
  | 'AUTHORIZATION_DENIED'
  | 'AUTHORIZATION_POLICY_NOT_FOUND'
  | 'AUTHORIZATION_ROLE_NOT_FOUND'
  | 'AUTHORIZATION_PERMISSION_NOT_FOUND'
  | 'AUTHORIZATION_SCOPE_NOT_RESOLVED'
  | 'AUTHORIZATION_EVALUATION_FAILED'

export interface AuthorizationError {
  readonly code: AuthorizationErrorCode
  readonly message: string
  readonly details?: Readonly<Record<string, unknown>>
  readonly cause?: unknown
}
