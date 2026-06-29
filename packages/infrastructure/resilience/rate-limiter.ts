import type { Clock } from '../utilities/clock'
import { SystemClock } from '../utilities/clock'

export interface RateLimiter {
  allow(key?: string): boolean
  reset(key?: string): void
}

export interface RateLimiterOptions {
  limit?: number
  windowMs?: number
  clock?: Clock
}

export class FixedWindowRateLimiter implements RateLimiter {
  private readonly limit: number
  private readonly windowMs: number
  private readonly clock: Clock
  private readonly windows = new Map<string, { count: number; windowStart: number }>()

  constructor(options: RateLimiterOptions = {}) {
    this.limit = options.limit ?? 100
    this.windowMs = options.windowMs ?? 60_000
    this.clock = options.clock ?? new SystemClock()
  }

  allow(key = 'default'): boolean {
    const now = this.clock.nowEpochMs()
    const current = this.windows.get(key)

    if (!current || now - current.windowStart >= this.windowMs) {
      this.windows.set(key, { count: 1, windowStart: now })
      return true
    }

    if (current.count >= this.limit) {
      return false
    }

    current.count += 1
    return true
  }

  reset(key = 'default'): void {
    this.windows.delete(key)
  }
}
