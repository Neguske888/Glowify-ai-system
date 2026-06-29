import type { HealthState } from "./types"

export interface HealthMetadata {
  readonly runtimeId: string
  readonly state: HealthState
  readonly checkedAt?: string
}
