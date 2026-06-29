import type { Timestamp } from "./types"

export interface MembershipMetadata {
  readonly membershipId: string
  readonly userId?: string
  readonly tenantId?: string
  readonly organizationId?: string
  readonly role?: string
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}

export interface MembershipContract {
  readonly metadata: MembershipMetadata
  readonly active?: boolean
}
