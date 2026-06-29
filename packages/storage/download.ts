import type { StorageObject } from './object'
import type { StorageDownloadStrategy } from './types'

export interface DownloadRange {
  readonly start?: number
  readonly end?: number
}

export interface DownloadRequest {
  readonly objectId: string
  readonly strategy?: StorageDownloadStrategy
  readonly range?: DownloadRange
  readonly partial?: boolean
}

export interface DownloadResult<T = unknown> {
  readonly object?: StorageObject<T>
  readonly downloadedAt?: string
  readonly contentRange?: DownloadRange
  readonly partial?: boolean
}
