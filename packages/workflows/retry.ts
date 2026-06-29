export interface WorkflowRetryPolicy {
  readonly maxAttempts: number
  readonly delayMs?: number
  readonly backoffStrategy?: 'fixed' | 'linear' | 'exponential'
  shouldRetry(attempt: number, error?: unknown): boolean
}

export interface WorkflowRetryContext {
  readonly workflowId: string
  readonly executionId: string
  readonly attempt: number
  readonly lastError?: unknown
}
