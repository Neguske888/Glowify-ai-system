import type { TrustLevel, Timestamp } from "./types"

export interface TrustMetadata {
  readonly trustLevel: TrustLevel
  readonly verified?: boolean
  readonly source?: string
  readonly assessedAt?: Timestamp
}
