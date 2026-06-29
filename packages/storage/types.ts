export type ObjectId = string
export type TenantId = string
export type OrganizationId = string
export type OwnerId = string
export type BucketId = string
export type ObjectKey = string
export type Filename = string
export type ContentType = string
export type FileExtension = string
export type Size = number
export type Checksum = string
export type Version = string
export type ETag = string
export type StorageClass = string
export type EncryptionName = string
export type CompressionName = string
export type Timestamp = string
export type Locale = string

export type StorageUploadStrategy = 'single' | 'multipart' | 'resumable' | 'streaming'
export type StorageDownloadStrategy = 'streaming' | 'range' | 'partial'
export type StorageLifecycleStatus = 'active' | 'archived' | 'deleted' | 'restored' | 'expired'
export type StorageVisibility = 'public' | 'private'
export type StorageLockMode = 'none' | 'governance' | 'compliance'
export type StorageRetentionMode = 'time-based' | 'event-based' | 'manual'

export interface StorageMetadata {
  readonly objectId: ObjectId
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly ownerId?: OwnerId
  readonly bucketId?: BucketId
  readonly objectKey?: ObjectKey
  readonly filename?: Filename
  readonly contentType?: ContentType
  readonly extension?: FileExtension
  readonly size?: Size
  readonly checksum?: Checksum
  readonly version?: Version
  readonly etag?: ETag
  readonly storageClass?: StorageClass
  readonly encryption?: EncryptionName
  readonly compression?: CompressionName
  readonly visibility?: StorageVisibility
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
  readonly expiresAt?: Timestamp
  readonly deletedAt?: Timestamp
}

export interface VirusScanMetadata {
  readonly scannedAt?: Timestamp
  readonly scanner?: string
  readonly status?: 'pending' | 'clean' | 'infected' | 'error'
  readonly signature?: string
  readonly threatName?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface ContentModerationMetadata {
  readonly moderatedAt?: Timestamp
  readonly provider?: string
  readonly status?: 'pending' | 'approved' | 'flagged' | 'rejected' | 'error'
  readonly category?: string
  readonly score?: number
  readonly labels?: ReadonlyArray<string>
  readonly metadata?: Readonly<Record<string, unknown>>
}
