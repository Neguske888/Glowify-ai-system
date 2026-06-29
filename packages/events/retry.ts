export interface RetryPolicy {
  readonly maxAttempts: number
  readonly delayMs?: number
  readonly backoffStrategy?: 'fixed' | 'linear' | 'exponential'
  shouldRetry(attempt: number, error?: unknown): boolean
}

export interface RetryContext {
  readonly eventId: string
  readonly attempt: number
  readonly lastError?: unknown
}
