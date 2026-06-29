export interface MessagingMetrics {
  readonly brokerId?: string
  readonly messageCount?: number
  readonly errorCount?: number
  readonly latencyMs?: number
}
