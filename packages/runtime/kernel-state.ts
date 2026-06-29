import type { LifecycleState } from "./types"

export interface KernelState {
  readonly state: LifecycleState
  readonly startedAt?: string
  readonly stoppedAt?: string
  readonly reason?: string
}
