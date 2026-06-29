export interface ShutdownMetadata {
  readonly shutdownId: string
  readonly initiatedAt?: string
  readonly completedAt?: string
  readonly reason?: string
}
