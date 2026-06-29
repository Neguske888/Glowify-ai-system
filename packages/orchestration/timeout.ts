export interface TimeoutPolicy {
  readonly enabled: boolean
  readonly timeoutMs?: number
  readonly hardTimeoutMs?: number
}
