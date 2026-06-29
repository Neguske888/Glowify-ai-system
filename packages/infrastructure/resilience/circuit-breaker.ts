import type { Clock } from '../utilities/clock'
import { SystemClock } from '../utilities/clock'

export type CircuitBreakerState = 'closed' | 'open' | 'half-open'

export interface CircuitBreaker {
  readonly state: CircuitBreakerState
  canExecute(): boolean
  recordSuccess(): void
  recordFailure(): void
  execute<T>(operation: () => Promise<T> | T): Promise<T>
}

export interface CircuitBreakerOptions {
  failureThreshold?: number
  resetTimeoutMs?: number
  clock?: Clock
}

export class BasicCircuitBreaker implements CircuitBreaker {
  private failures = 0
  private openedAt: number | undefined
  private currentState: CircuitBreakerState = 'closed'
  private readonly failureThreshold: number
  private readonly resetTimeoutMs: number
  private readonly clock: Clock

  constructor(options: CircuitBreakerOptions = {}) {
    this.failureThreshold = options.failureThreshold ?? 5
    this.resetTimeoutMs = options.resetTimeoutMs ?? 30_000
    this.clock = options.clock ?? new SystemClock()
  }

  get state(): CircuitBreakerState {
    if (this.currentState === 'open' && this.openedAt !== undefined) {
      const elapsed = this.clock.nowEpochMs() - this.openedAt
      if (elapsed >= this.resetTimeoutMs) {
        this.currentState = 'half-open'
      }
    }
    return this.currentState
  }

  canExecute(): boolean {
    return this.state !== 'open'
  }

  recordSuccess(): void {
    this.failures = 0
    this.openedAt = undefined
    this.currentState = 'closed'
  }

  recordFailure(): void {
    this.failures += 1
    if (this.failures >= this.failureThreshold) {
      this.currentState = 'open'
      this.openedAt = this.clock.nowEpochMs()
    }
  }

  async execute<T>(operation: () => Promise<T> | T): Promise<T> {
    if (!this.canExecute()) {
      throw new Error('Circuit breaker is open')
    }

    try {
      const result = await operation()
      this.recordSuccess()
      return result
    } catch (error) {
      this.recordFailure()
      throw error
    }
  }
}
