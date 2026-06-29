import type { Timestamp } from "./types"

export interface InvitationMetadata {
  readonly invitationId: string
  readonly email?: string
  readonly tenantId?: string
  readonly organizationId?: string
  readonly invitedAt?: Timestamp
  readonly expiresAt?: Timestamp
}

export interface InvitationContract {
  readonly metadata: InvitationMetadata
  readonly acceptedAt?: Timestamp
}
