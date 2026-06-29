import type { Timestamp } from "./types"

export interface LoginAttemptContract {
  readonly loginAttemptId: string
  readonly userId?: string
  readonly identityId?: string
  readonly attemptedAt?: Timestamp
  readonly succeeded?: boolean
  readonly failureReason?: string
}
