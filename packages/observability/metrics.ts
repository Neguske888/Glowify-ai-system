import type { MetricEntry, MetricType, ObservabilityAttributes } from './types'

export interface MetricsCollector {
  record(name: string, metricType: MetricType, value: number, attributes?: ObservabilityAttributes, unit?: string): void
  counter(name: string, value: number, attributes?: ObservabilityAttributes, unit?: string): void
  gauge(name: string, value: number, attributes?: ObservabilityAttributes, unit?: string): void
  histogram(name: string, value: number, attributes?: ObservabilityAttributes, unit?: string): void
  timer(name: string, value: number, attributes?: ObservabilityAttributes, unit?: string): void
  entries(): ReadonlyArray<MetricEntry>
}
