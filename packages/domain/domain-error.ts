export type DomainErrorCode =
  | 'DOMAIN_VALIDATION_FAILED'
  | 'DOMAIN_CONCURRENCY_CONFLICT'
  | 'DOMAIN_NOT_FOUND'
  | 'DOMAIN_ALREADY_EXISTS'
  | 'DOMAIN_POLICY_VIOLATION'
  | 'DOMAIN_INVARIANT_VIOLATION'

export interface DomainError {
  readonly code: DomainErrorCode
  readonly message: string
  readonly details?: Readonly<Record<string, unknown>>
  readonly cause?: unknown
}
