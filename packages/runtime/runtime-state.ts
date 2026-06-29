import type { LifecycleState } from "./types"

export interface RuntimeState {
  readonly state: LifecycleState
  readonly initializedAt?: string
  readonly updatedAt?: string
  readonly reason?: string
}
