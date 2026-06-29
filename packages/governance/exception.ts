import type { Timestamp } from "./types"

export interface GovernanceException {
  readonly exceptionId: string
  readonly policyId?: string
  readonly reason: string
  readonly approved?: boolean
  readonly expiresAt?: Timestamp
}
