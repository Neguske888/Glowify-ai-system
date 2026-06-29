export interface OrchestrationMetrics {
  readonly orchestrationId?: string
  readonly executionCount?: number
  readonly successCount?: number
  readonly failureCount?: number
  readonly averageDurationMs?: number
}
