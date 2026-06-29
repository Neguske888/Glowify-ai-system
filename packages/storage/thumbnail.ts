import type { StorageObject } from './object'
import type { Timestamp } from './types'

export interface ThumbnailRequest {
  readonly objectId: string
  readonly width: number
  readonly height: number
  readonly fit?: 'contain' | 'cover' | 'crop'
}

export interface ThumbnailResult {
  readonly object?: StorageObject
  readonly generatedAt?: string
}

export interface ThumbnailMetadata {
  readonly width: number
  readonly height: number
  readonly format?: string
  readonly generatedAt?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface ThumbnailGenerator {
  generate(request: ThumbnailRequest): Promise<ThumbnailResult>
}
