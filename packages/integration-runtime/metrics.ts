export interface MetricsContract {
  readonly integrationId: string
  readonly requestCount?: number
  readonly failureCount?: number
  readonly latencyMs?: number
}
