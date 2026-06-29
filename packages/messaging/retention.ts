export interface RetentionContract {
  readonly retentionId: string
  readonly retainForDays?: number
  readonly deleteAfterExpiry?: boolean
}
