import type { CostAmount } from "./types"

export interface CostMetadata {
  readonly currency?: string
  readonly amount?: CostAmount
  readonly unit?: string
}
