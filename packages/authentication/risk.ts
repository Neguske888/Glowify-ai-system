import type { Timestamp, TrustScore } from "./types"

export interface RiskMetadata {
  readonly riskScore: number
  readonly reason?: string
  readonly assessedAt?: Timestamp
}

export interface RiskContract {
  readonly metadata: RiskMetadata
  readonly subjectId?: string
}
