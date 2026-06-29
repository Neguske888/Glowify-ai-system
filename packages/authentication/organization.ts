import type { Timestamp } from "./types"

export interface OrganizationMetadata {
  readonly organizationId: string
  readonly name?: string
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}

export interface OrganizationContract {
  readonly metadata: OrganizationMetadata
  readonly active?: boolean
}
