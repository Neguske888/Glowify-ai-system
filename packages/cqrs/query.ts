import type { RequestMetadata } from './types'

export interface Query<TResponse = unknown, TCriteria = unknown, TMetadata extends RequestMetadata = RequestMetadata> {
  readonly name: string
  readonly criteria: TCriteria
  readonly metadata?: TMetadata
  readonly expectedResponse?: TResponse
}
