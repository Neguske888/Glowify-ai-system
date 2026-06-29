export interface MetricPoint {
  name: string
  value: number
  labels?: Record<string, string>
  timestamp: Date
}

export interface MetricsSnapshot {
  counters: ReadonlyArray<MetricPoint>
  gauges: ReadonlyArray<MetricPoint>
  histograms: ReadonlyArray<MetricPoint>
}

export interface MetricsCollector {
  increment(name: string, value?: number, labels?: Record<string, string>): void
  gauge(name: string, value: number, labels?: Record<string, string>): void
  histogram(name: string, value: number, labels?: Record<string, string>): void
  snapshot(): MetricsSnapshot
}

export class InMemoryMetricsCollector implements MetricsCollector {
  private readonly counters: MetricPoint[] = []
  private readonly gauges: MetricPoint[] = []
  private readonly histograms: MetricPoint[] = []

  increment(name: string, value = 1, labels?: Record<string, string>): void {
    this.counters.push({ name, value, labels, timestamp: new Date() })
  }

  gauge(name: string, value: number, labels?: Record<string, string>): void {
    this.gauges.push({ name, value, labels, timestamp: new Date() })
  }

  histogram(name: string, value: number, labels?: Record<string, string>): void {
    this.histograms.push({ name, value, labels, timestamp: new Date() })
  }

  snapshot(): MetricsSnapshot {
    return {
      counters: [...this.counters],
      gauges: [...this.gauges],
      histograms: [...this.histograms],
    }
  }
}
