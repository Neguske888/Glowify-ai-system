import type { HealthState } from "./types"

export interface AdapterHealth {
  readonly adapterId: string
  readonly state: HealthState
  readonly checkedAt?: string
  readonly notes?: readonly string[]
}
