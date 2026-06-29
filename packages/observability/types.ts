export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'
export type MetricType = 'counter' | 'gauge' | 'histogram' | 'timer'
export type TraceKind = 'trace' | 'span'
export type AuditOutcome = 'success' | 'failure' | 'pending'
export type DiagnosticEventType = 'startup' | 'shutdown' | 'registration' | 'dependency' | 'warning' | 'failure'
export type HealthStatus = 'healthy' | 'degraded' | 'unhealthy'

export interface ObservabilityAttributes {
  readonly [key: string]: string | number | boolean | null | undefined
}

export interface ObservabilityEvent {
  readonly name: string
  readonly timestamp: string
  readonly attributes?: ObservabilityAttributes
}

export interface LogEntry extends ObservabilityEvent {
  readonly level: LogLevel
  readonly message: string
}

export interface MetricEntry extends ObservabilityEvent {
  readonly metricType: MetricType
  readonly value: number
  readonly unit?: string
}

export interface TraceEvent extends ObservabilityEvent {
  readonly message: string
}

export interface TraceSpan extends ObservabilityEvent {
  readonly spanId: string
  readonly parentSpanId?: string
  readonly kind: TraceKind
  readonly events?: ReadonlyArray<TraceEvent>
}

export interface AuditRecord extends ObservabilityEvent {
  readonly actor: string
  readonly tenant: string
  readonly action: string
  readonly resource: string
  readonly outcome: AuditOutcome
}

export interface DiagnosticEvent extends ObservabilityEvent {
  readonly eventType: DiagnosticEventType
  readonly source?: string
  readonly message: string
}

export interface HealthReport extends ObservabilityEvent {
  readonly service: string
  readonly status: HealthStatus
  readonly details?: string
}
