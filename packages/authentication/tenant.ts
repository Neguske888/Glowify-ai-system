import type { Timestamp } from "./types"

export interface TenantMetadata {
  readonly tenantId: string
  readonly name?: string
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}

export interface TenantContract {
  readonly metadata: TenantMetadata
  readonly active?: boolean
}
