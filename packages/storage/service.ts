import type { StorageObject } from './object'
import type { StorageProvider } from './provider'
import type { StorageRepository } from './repository'
import type { StorageMetadata, StorageUploadStrategy, StorageDownloadStrategy } from './types'
import type { MultipartUpload } from './multipart'
import type { SignedUrlService } from './signed-url'
import type { ObjectTransformer } from './transformation'
import type { ThumbnailGenerator } from './thumbnail'
import type { LifecycleManager } from './lifecycle'
import type { RetentionPolicyManager } from './retention'

export interface StorageService {
  upload<T>(object: StorageObject<T>, strategy?: StorageUploadStrategy): Promise<StorageObject<T>>
  download(objectId: string, strategy?: StorageDownloadStrategy): Promise<StorageObject | undefined>
  downloadRange(objectId: string, range: { readonly start?: number; readonly end?: number }): Promise<StorageObject | undefined>
  delete(objectId: string): Promise<boolean>
  restore(objectId: string): Promise<boolean>
  copy(sourceObjectId: string, destinationBucketId: string, destinationKey?: string): Promise<StorageObject | undefined>
  move(sourceObjectId: string, destinationBucketId: string, destinationKey?: string): Promise<StorageObject | undefined>
  rename(objectId: string, filename: string): Promise<StorageObject | undefined>
  list(bucketId?: string): Promise<ReadonlyArray<StorageObject>>
  exists(objectId: string): Promise<boolean>
  stat(objectId: string): Promise<StorageMetadata | undefined>
  multipart(): Promise<ReadonlyArray<MultipartUpload>>
  signedUrls(): Promise<SignedUrlService>
  transformer(): Promise<ObjectTransformer>
  thumbnails(): Promise<ThumbnailGenerator>
  lifecycle(): Promise<LifecycleManager>
  retention(): Promise<RetentionPolicyManager>
  provider(): Promise<StorageProvider>
  repository(): Promise<StorageRepository>
}
