export type ConfigurationErrorCode =
  | 'CONFIGURATION_NOT_FOUND'
  | 'CONFIGURATION_INVALID'
  | 'CONFIGURATION_VERSION_CONFLICT'
  | 'CONFIGURATION_ROLLBACK_FAILED'
  | 'FEATURE_FLAG_EVALUATION_FAILED'

export interface ConfigurationError {
  readonly code: ConfigurationErrorCode
  readonly message: string
  readonly details?: Readonly<Record<string, unknown>>
  readonly cause?: unknown
}
