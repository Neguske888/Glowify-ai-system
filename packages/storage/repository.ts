import type { StorageObject } from './object'
import type { StorageMetadata } from './types'

export interface StorageRepository {
  save<T>(object: StorageObject<T>): Promise<StorageObject<T>>
  findById(objectId: string): Promise<StorageObject | undefined>
  list(bucketId?: string): Promise<ReadonlyArray<StorageObject>>
  remove(objectId: string): Promise<boolean>
  restore(objectId: string): Promise<boolean>
  stat(objectId: string): Promise<StorageMetadata | undefined>
}
