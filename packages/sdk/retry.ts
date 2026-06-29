export interface RetryMetadata {
  readonly enabled: boolean
  readonly maxAttempts?: number
  readonly backoffMs?: number
  readonly jitter?: boolean
}
