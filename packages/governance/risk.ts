import type { RiskScore, Timestamp } from "./types"

export interface RiskMetadata {
  readonly score: RiskScore
  readonly level?: "low" | "moderate" | "high" | "critical"
  readonly reason?: string
  readonly assessedAt?: Timestamp
}

export interface RiskAssessment {
  readonly riskId: string
  readonly metadata: RiskMetadata
}
