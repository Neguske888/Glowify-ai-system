import type { HealthReport, HealthStatus, ObservabilityAttributes } from './types'

export interface HealthReporter {
  report(service: string, status: HealthStatus, details?: string, attributes?: ObservabilityAttributes): void
  reports(): ReadonlyArray<HealthReport>
}
