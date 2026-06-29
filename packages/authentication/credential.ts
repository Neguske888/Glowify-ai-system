import type { Timestamp, CredentialId, UserId, AuthenticationLifecycleState } from "./types"

export type CredentialType = "password" | "passkey" | "webauthn" | "oauth" | "oidc" | "saml" | "magic_link" | "api_key" | "service_account"

export interface CredentialMetadata {
  readonly credentialId: CredentialId
  readonly userId?: UserId
  readonly type: CredentialType
  readonly state?: AuthenticationLifecycleState
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}

export interface CredentialContract {
  readonly metadata: CredentialMetadata
  readonly label?: string
  readonly provider?: string
}
