import type { BootstrapChildHealthProvider, BootstrapHealthReport } from './types'

export interface HealthService {
  healthCheck(): Promise<BootstrapHealthReport[]>
}

export class AggregatedHealthService implements HealthService {
  constructor(private readonly providers: ReadonlyArray<BootstrapChildHealthProvider>) {}

  async healthCheck(): Promise<BootstrapHealthReport[]> {
    const reports: BootstrapHealthReport[] = []
    for (const provider of this.providers) {
      reports.push(await provider.healthCheck())
    }
    return reports
  }
}
