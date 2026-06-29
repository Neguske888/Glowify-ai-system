import type { Clock } from '../utilities/clock'
import { SystemClock } from '../utilities/clock'

export interface RetryPolicy {
  execute<T>(operation: () => Promise<T> | T): Promise<T>
}

export interface RetryPolicyOptions {
  maxAttempts?: number
  delayMs?: number
  clock?: Clock
  shouldRetry?: (error: unknown, attempt: number) => boolean
}

export class BasicRetryPolicy implements RetryPolicy {
  private readonly maxAttempts: number
  private readonly delayMs: number
  private readonly clock: Clock
  private readonly shouldRetry: (error: unknown, attempt: number) => boolean

  constructor(options: RetryPolicyOptions = {}) {
    this.maxAttempts = options.maxAttempts ?? 3
    this.delayMs = options.delayMs ?? 0
    this.clock = options.clock ?? new SystemClock()
    this.shouldRetry = options.shouldRetry ?? (() => true)
  }

  async execute<T>(operation: () => Promise<T> | T): Promise<T> {
    let attempt = 0
    while (true) {
      try {
        return await operation()
      } catch (error) {
        attempt += 1
        if (attempt >= this.maxAttempts || !this.shouldRetry(error, attempt)) {
          throw error
        }
        if (this.delayMs > 0) {
          await this.clock.sleep(this.delayMs)
        }
      }
    }
  }
}
