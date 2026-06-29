import type { VerificationMetadata } from "./verification"

export interface EmailVerificationContract {
  readonly metadata: VerificationMetadata
  readonly email: string
}
