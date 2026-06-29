import type { Timestamp } from "./types"

export interface ConsentMetadata {
  readonly consentId: string
  readonly subjectId?: string
  readonly granted: boolean
  readonly scope?: readonly string[]
  readonly capturedAt?: Timestamp
  readonly revokedAt?: Timestamp
}
