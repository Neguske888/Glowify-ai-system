import type { LivenessState } from "./types"

export interface LivenessMetadata {
  readonly runtimeId: string
  readonly state: LivenessState
  readonly checkedAt?: string
}
