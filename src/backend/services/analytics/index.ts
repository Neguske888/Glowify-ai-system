import type { HealthStatus, Pagination, RequestContext, Result } from '../../contracts'

export interface TrackEventInput {
  context: RequestContext
  eventName: string
  properties?: Record<string, unknown>
}

export interface RecordMetricInput {
  context: RequestContext
  metricName: string
  value: number
  dimensions?: Record<string, string | number | boolean>
}

export interface GenerateReportInput {
  context: RequestContext
  range?: Pagination
  query?: string
}

export interface AnalyticsEventOutput {
  accepted: boolean
  eventId?: string
}

export interface AnalyticsMetricOutput {
  recorded: boolean
  metricId?: string
}

export interface AnalyticsReportOutput {
  reportId: string
  rows: ReadonlyArray<Record<string, unknown>>
}

export interface AnalyticsService {
  trackEvent(input: TrackEventInput): Promise<Result<AnalyticsEventOutput>>
  recordMetric(input: RecordMetricInput): Promise<Result<AnalyticsMetricOutput>>
  generateReport(input: GenerateReportInput): Promise<Result<AnalyticsReportOutput>>
  healthCheck(context: RequestContext): Promise<Result<HealthStatus>>
}
