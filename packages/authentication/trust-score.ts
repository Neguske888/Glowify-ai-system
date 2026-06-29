import type { Timestamp, TrustScore } from "./types"

export interface TrustScoreMetadata {
  readonly trustScore: TrustScore
  readonly source?: string
  readonly calculatedAt?: Timestamp
}

export interface TrustScoreContract {
  readonly metadata: TrustScoreMetadata
  readonly subjectId?: string
}
