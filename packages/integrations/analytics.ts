import type { IntegrationProvider } from './base'
import type { IntegrationResult } from './types'

export interface IngestEventInput {
  readonly tenantId: string
  readonly eventName: string
  readonly eventId?: string
  readonly properties?: Readonly<Record<string, unknown>>
  readonly occurredAt?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface QueryMetricsInput {
  readonly tenantId: string
  readonly query: string
  readonly from?: string
  readonly to?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface AnalyticsProvider extends IntegrationProvider {
  ingestEvent(input: IngestEventInput): Promise<IntegrationResult<AnalyticsIngestResponse>>
  queryMetrics(input: QueryMetricsInput): Promise<IntegrationResult<AnalyticsQueryResponse>>
}

export interface AnalyticsIngestResponse {
  readonly accepted: boolean
  readonly eventId?: string
}

export interface AnalyticsQueryResponse {
  readonly series: ReadonlyArray<Record<string, unknown>>
  readonly metadata?: Readonly<Record<string, unknown>>
}
