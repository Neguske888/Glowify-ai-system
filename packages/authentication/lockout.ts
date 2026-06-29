import type { Timestamp } from "./types"

export interface LockoutPolicy {
  readonly lockoutPolicyId: string
  readonly maxAttempts?: number
  readonly durationSeconds?: number
  readonly resetAfterSeconds?: number
}

export interface LockoutContract {
  readonly lockoutId: string
  readonly userId?: string
  readonly policy?: LockoutPolicy
  readonly lockedUntil?: Timestamp
}
