import type { Timestamp } from "./types"
import type { IdentityMetadata } from "./identity"

export interface AccountMetadata {
  readonly accountId: string
  readonly identity: IdentityMetadata
  readonly provider?: string
  readonly linkedAt?: Timestamp
}

export interface AccountContract {
  readonly metadata: AccountMetadata
  readonly externalAccountId?: string
  readonly providerAccountEmail?: string
}
