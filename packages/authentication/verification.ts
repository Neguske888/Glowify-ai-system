import type { VerificationId, VerificationState, Timestamp } from "./types"

export interface VerificationMetadata {
  readonly verificationId: VerificationId
  readonly state?: VerificationState
  readonly createdAt?: Timestamp
  readonly expiresAt?: Timestamp
  readonly verifiedAt?: Timestamp
}

export interface VerificationContract {
  readonly metadata: VerificationMetadata
  readonly channel?: string
  readonly destination?: string
}
