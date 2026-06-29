import type { ReadinessState } from "./types"

export interface ReadinessMetadata {
  readonly runtimeId: string
  readonly state: ReadinessState
  readonly checkedAt?: string
}
