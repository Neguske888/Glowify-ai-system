export type HealthStatus = 'healthy' | 'degraded' | 'unhealthy'

export interface HealthCheckResult {
  name: string
  status: HealthStatus
  details?: string
}

export interface HealthChecker {
  register(name: string, check: () => HealthCheckResult | Promise<HealthCheckResult>): this
  check(name?: string): Promise<HealthCheckResult[]>
}

export class BasicHealthChecker implements HealthChecker {
  private readonly checks = new Map<string, () => HealthCheckResult | Promise<HealthCheckResult>>()

  register(name: string, check: () => HealthCheckResult | Promise<HealthCheckResult>): this {
    this.checks.set(name, check)
    return this
  }

  async check(name?: string): Promise<HealthCheckResult[]> {
    const entries = name ? [[name, this.checks.get(name)] as const] : [...this.checks.entries()]
    const results: HealthCheckResult[] = []

    for (const [checkName, check] of entries) {
      if (!check) {
        results.push({ name: checkName, status: 'unhealthy', details: 'No check registered' })
        continue
      }

      results.push(await check())
    }

    return results
  }
}
