import type { StorageObject } from './object'
import type { Timestamp } from './types'

export interface TransformationRequest {
  readonly objectId: string
  readonly transform: string
  readonly parameters?: Readonly<Record<string, unknown>>
}

export interface TransformationResult {
  readonly object?: StorageObject
  readonly transformedAt?: string
}

export interface TransformationMetadata {
  readonly name: string
  readonly parameters?: Readonly<Record<string, unknown>>
  readonly appliedAt?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface ObjectTransformer {
  transform(request: TransformationRequest): Promise<TransformationResult>
}
