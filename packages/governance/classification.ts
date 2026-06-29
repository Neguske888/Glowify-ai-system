import type { Classification, Sensitivity } from "./types"

export interface ClassificationContract {
  readonly classification: Classification
  readonly sensitivity?: Sensitivity
  readonly label?: string
  readonly notes?: readonly string[]
}
