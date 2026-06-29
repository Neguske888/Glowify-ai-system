export interface AuthorizationMetadata {
  readonly authorizationId: string
  readonly scheme?: string
  readonly requiredScopes?: readonly string[]
  readonly requiredRoles?: readonly string[]
}
