import type { MultiFactorMetadata } from "./multi-factor"

export interface PasskeyContract {
  readonly metadata: MultiFactorMetadata
  readonly credentialId?: string
  readonly syncable?: boolean
}
