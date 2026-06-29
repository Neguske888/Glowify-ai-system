import type { CredentialReference } from "./credential-reference"
import type { SecretReference } from "./secret-reference"

export interface ConnectionContract {
  readonly connectionId: string
  readonly name?: string
  readonly credential?: CredentialReference
  readonly secret?: SecretReference
}
