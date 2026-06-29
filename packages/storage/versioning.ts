import type { StorageObject } from './object'
import type { Timestamp } from './types'

export interface ObjectVersion<T = unknown> extends StorageObject<T> {
  readonly versionId?: string
  readonly isLatest?: boolean
  readonly createdAt?: Timestamp
}

export interface VersioningStrategy {
  readonly enabled?: boolean
  readonly keepHistory?: boolean
  readonly maxVersions?: number
  current(objectId: string): Promise<ObjectVersion | undefined>
  history(objectId: string): Promise<ReadonlyArray<ObjectVersion>>
  rollback(objectId: string, version: string): Promise<ObjectVersion | undefined>
}
