import type { RecoveryMetadata } from "./recovery"

export interface AccountRecoveryContract {
  readonly metadata: RecoveryMetadata
  readonly recoveryMethods?: readonly string[]
}
