import type { Timestamp } from "./types"

export interface RetentionPolicy {
  readonly retentionId: string
  readonly retainForDays?: number
  readonly retainUntil?: Timestamp
  readonly deleteAfterExpiry?: boolean
  readonly legalHold?: boolean
}
