import type { StorageMetadata } from './types'

export interface MetadataComparator {
  compare(left: StorageMetadata, right: StorageMetadata): number
}
