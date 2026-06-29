export interface SynchronizationJob {
  readonly synchronizationJobId: string
  readonly name: string
  readonly status?: string
  readonly startedAt?: string
  readonly completedAt?: string
}
