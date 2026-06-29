export interface ExecutionContract {
  readonly executionId: string
  readonly jobId?: string
  readonly status?: string
  readonly startedAt?: string
  readonly completedAt?: string
}
