export interface DataAccessPolicy {
  readonly dataAccessId: string
  readonly allowedRoles?: readonly string[]
  readonly allowedScopes?: readonly string[]
  readonly readOnly?: boolean
  readonly justificationRequired?: boolean
}
