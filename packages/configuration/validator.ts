import type { ConfigurationSchema } from './schema'
import type { ConfigurationSnapshot } from './types'

export interface ConfigurationValidationIssue {
  readonly path: string
  readonly message: string
  readonly code?: string
}

export interface ConfigurationValidationResult {
  readonly valid: boolean
  readonly issues: ReadonlyArray<ConfigurationValidationIssue>
}

export interface ConfigurationValidator<T = unknown> {
  validate(snapshot: ConfigurationSnapshot<T>, schema?: ConfigurationSchema): Promise<ConfigurationValidationResult>
}
