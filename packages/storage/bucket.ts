import type { BucketId, TenantId, OrganizationId, StorageClass, Timestamp, StorageVisibility } from './types'

export interface Bucket {
  readonly bucketId: BucketId
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly name: string
  readonly storageClass?: StorageClass
  readonly visibility?: StorageVisibility
  readonly region?: string
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}
