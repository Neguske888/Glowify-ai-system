import type { CostMetadata } from "./cost"

export interface UsageMetadata {
  readonly promptTokens?: number
  readonly completionTokens?: number
  readonly totalTokens?: number
  readonly cost?: CostMetadata
}
