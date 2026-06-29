export interface ExecutionMetadata {
  readonly executionId: string
  readonly taskId?: string
  readonly startedAt?: string
  readonly completedAt?: string
  readonly status?: string
}
