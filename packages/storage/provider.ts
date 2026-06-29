import type { StorageObject } from './object'
import type { Bucket } from './bucket'
import type { StorageMetadata, StorageUploadStrategy, StorageDownloadStrategy } from './types'
import type { MultipartUpload } from './multipart'
import type { SignedUrlService } from './signed-url'
import type { ThumbnailGenerator } from './thumbnail'
import type { ObjectTransformer } from './transformation'
import type { LifecycleManager } from './lifecycle'
import type { RetentionPolicyManager } from './retention'
import type { DownloadRange, DownloadResult } from './download'

export interface StorageProvider {
  readonly name: string
  readonly uploadStrategies: ReadonlyArray<StorageUploadStrategy>
  readonly downloadStrategies: ReadonlyArray<StorageDownloadStrategy>
  upload<T>(object: StorageObject<T>): Promise<StorageObject<T>>
  download(objectId: string): Promise<StorageObject | undefined>
  downloadRange(objectId: string, range: DownloadRange): Promise<DownloadResult | undefined>
  delete(objectId: string): Promise<boolean>
  restore(objectId: string): Promise<boolean>
  copy(sourceObjectId: string, destinationBucketId: string, destinationKey?: string): Promise<StorageObject | undefined>
  move(sourceObjectId: string, destinationBucketId: string, destinationKey?: string): Promise<StorageObject | undefined>
  rename(objectId: string, filename: string): Promise<StorageObject | undefined>
  list(bucketId?: string): Promise<ReadonlyArray<StorageObject>>
  exists(objectId: string): Promise<boolean>
  stat(objectId: string): Promise<StorageMetadata | undefined>
  buckets(): Promise<ReadonlyArray<Bucket>>
  multipart(): Promise<ReadonlyArray<MultipartUpload>>
  signedUrls(): Promise<SignedUrlService>
  thumbnails(): Promise<ThumbnailGenerator>
  transformer(): Promise<ObjectTransformer>
  lifecycle(): Promise<LifecycleManager>
  retention(): Promise<RetentionPolicyManager>
}
