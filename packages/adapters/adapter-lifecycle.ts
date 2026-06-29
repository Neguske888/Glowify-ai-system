import type { LifecycleState } from "./types"

export interface AdapterLifecycle {
  readonly state: LifecycleState
  readonly activatedAt?: string
  readonly deactivatedAt?: string
  readonly reason?: string
}
