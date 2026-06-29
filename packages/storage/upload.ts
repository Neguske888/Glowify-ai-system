import type { StorageObject } from './object'
import type { StorageUploadStrategy } from './types'

export interface UploadRequest<T = unknown> {
  readonly object: StorageObject<T>
  readonly strategy?: StorageUploadStrategy
  readonly bucketId?: string
}

export interface UploadResult<T = unknown> {
  readonly object: StorageObject<T>
  readonly uploadedAt?: string
}
