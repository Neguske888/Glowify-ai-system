import type { StorageMetadata, VirusScanMetadata, ContentModerationMetadata } from './types'
import type { LifecyclePolicy } from './lifecycle'
import type { VersioningStrategy } from './versioning'
import type { RetentionPolicy } from './retention'
import type { ObjectLock } from './access-policy'
import type { ThumbnailMetadata } from './thumbnail'
import type { TransformationMetadata } from './transformation'

export interface StorageObject<TContent = unknown> {
  readonly metadata: StorageMetadata
  readonly content?: TContent
  readonly data?: ReadonlyArray<Uint8Array>
  readonly tags?: ReadonlyArray<string>
  readonly virusScan?: VirusScanMetadata
  readonly moderation?: ContentModerationMetadata
  readonly lifecycle?: LifecyclePolicy
  readonly versioning?: VersioningStrategy
  readonly retention?: RetentionPolicy
  readonly lock?: ObjectLock
  readonly thumbnails?: ReadonlyArray<ThumbnailMetadata>
  readonly transformations?: ReadonlyArray<TransformationMetadata>
}
