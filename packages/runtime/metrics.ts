export interface RuntimeMetrics {
  readonly runtimeId: string
  readonly cpuUsage?: number
  readonly memoryUsage?: number
  readonly uptimeSeconds?: number
}
