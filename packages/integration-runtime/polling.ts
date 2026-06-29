export interface PollingContract {
  readonly pollingId: string
  readonly intervalMs?: number
  readonly enabled?: boolean
}
