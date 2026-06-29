import type { SafetyState } from "./types"

export interface SafetyMetadata {
  readonly safetyId: string
  readonly state: SafetyState
  readonly notes?: readonly string[]
}
