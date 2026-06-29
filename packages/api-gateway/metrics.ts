export interface GatewayMetrics {
  readonly gatewayId: string
  readonly requestCount?: number
  readonly errorCount?: number
  readonly latencyMs?: number
}
