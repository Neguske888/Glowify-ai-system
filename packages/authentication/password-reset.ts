import type { RecoveryMetadata } from "./recovery"

export interface PasswordResetContract {
  readonly metadata: RecoveryMetadata
  readonly resetTokenId?: string
}
