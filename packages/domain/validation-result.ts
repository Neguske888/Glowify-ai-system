import type { ValidationSeverity } from './types'

export interface ValidationIssue {
  readonly path: string
  readonly message: string
  readonly severity: ValidationSeverity
  readonly code?: string
}

export interface ValidationResult {
  readonly valid: boolean
  readonly issues: ReadonlyArray<ValidationIssue>
}
