import type { VerificationMetadata } from "./verification"

export interface PhoneVerificationContract {
  readonly metadata: VerificationMetadata
  readonly phoneNumber: string
}
