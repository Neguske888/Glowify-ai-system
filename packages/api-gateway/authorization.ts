export interface AuthorizationMetadata {
  readonly authorizationId: string
  readonly requiredScopes?: readonly string[]
  readonly requiredRoles?: readonly string[]
  readonly requiredPermissions?: readonly string[]
}
