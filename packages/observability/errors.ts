export type ObservabilityErrorCode =
  | 'OBSERVABILITY_LOGGING_FAILED'
  | 'OBSERVABILITY_METRICS_FAILED'
  | 'OBSERVABILITY_TRACING_FAILED'
  | 'OBSERVABILITY_AUDIT_FAILED'
  | 'OBSERVABILITY_DIAGNOSTICS_FAILED'
  | 'OBSERVABILITY_HEALTH_FAILED'

export interface ObservabilityError {
  readonly code: ObservabilityErrorCode
  readonly message: string
  readonly cause?: unknown
}
