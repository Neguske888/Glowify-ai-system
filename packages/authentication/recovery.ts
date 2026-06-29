import type { Timestamp } from "./types"

export interface RecoveryMetadata {
  readonly recoveryId: string
  readonly userId?: string
  readonly requestedAt?: Timestamp
  readonly completedAt?: Timestamp
}

export interface RecoveryContract {
  readonly metadata: RecoveryMetadata
  readonly channel?: string
}
