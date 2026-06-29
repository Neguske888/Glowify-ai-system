import type { MultiFactorMetadata } from "./multi-factor"

export interface WebAuthnContract {
  readonly metadata: MultiFactorMetadata
  readonly relyingPartyId?: string
  readonly attestationFormat?: string
}
