import type { IdentityContract } from "./identity"
import type { SessionContract } from "./session"
import type { CredentialContract } from "./credential"
import type { TrustScore } from "./types"

export interface AuthenticationMetadata {
  readonly authenticationId: string
  readonly provider?: string
  readonly trustScore?: TrustScore
  readonly authenticatedAt?: string
  readonly createdAt?: string
  readonly updatedAt?: string
}

export interface AuthenticationContract {
  readonly metadata: AuthenticationMetadata
  readonly identity: IdentityContract
  readonly session?: SessionContract
  readonly credentials?: readonly CredentialContract[]
}
