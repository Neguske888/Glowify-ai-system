export interface IdentityError extends Error {
  code: string
  category: 'not_found' | 'validation' | 'authorization' | 'state' | 'tenant' | 'system'
  details?: Record<string, unknown>
}

export interface UserNotFoundError extends IdentityError {
  code: 'USER_NOT_FOUND'
}

export interface OrganizationNotFoundError extends IdentityError {
  code: 'ORGANIZATION_NOT_FOUND'
}

export interface MembershipNotFoundError extends IdentityError {
  code: 'MEMBERSHIP_NOT_FOUND'
}

export interface RoleNotFoundError extends IdentityError {
  code: 'ROLE_NOT_FOUND'
}

export interface PermissionDeniedError extends IdentityError {
  code: 'PERMISSION_DENIED'
}

export interface SessionExpiredError extends IdentityError {
  code: 'SESSION_EXPIRED'
}

export interface InvalidMembershipError extends IdentityError {
  code: 'INVALID_MEMBERSHIP'
}

export type IdentityDomainError =
  | UserNotFoundError
  | OrganizationNotFoundError
  | MembershipNotFoundError
  | RoleNotFoundError
  | PermissionDeniedError
  | SessionExpiredError
  | InvalidMembershipError
