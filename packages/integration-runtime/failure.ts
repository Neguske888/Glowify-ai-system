export interface FailureContract {
  readonly failureId: string
  readonly reason: string
  readonly recoverable?: boolean
}
