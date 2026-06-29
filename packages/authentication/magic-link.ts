import type { VerificationMetadata } from "./verification"

export interface MagicLinkContract {
  readonly metadata: VerificationMetadata
  readonly email: string
  readonly deepLink?: string
}
