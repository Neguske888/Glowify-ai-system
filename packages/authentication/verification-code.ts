import type { VerificationMetadata } from "./verification"

export interface VerificationCodeContract {
  readonly metadata: VerificationMetadata
  readonly codeLength?: number
  readonly deliveryChannel?: string
}
