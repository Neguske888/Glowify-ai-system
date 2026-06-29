import type { AuditRecord, DiagnosticEvent, HealthReport, LogEntry, MetricEntry, TraceSpan } from './types'

export interface LogSink {
  write(entry: LogEntry): void
}

export interface MetricSink {
  write(entry: MetricEntry): void
}

export interface TraceSink {
  write(span: TraceSpan): void
}

export interface AuditSink {
  write(record: AuditRecord): void
}

export interface DiagnosticSink {
  write(event: DiagnosticEvent): void
}

export interface HealthSink {
  write(report: HealthReport): void
}
