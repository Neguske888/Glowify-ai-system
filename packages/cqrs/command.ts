import type { RequestMetadata } from './types'

export interface Command<TPayload = unknown, TResult = unknown, TMetadata extends RequestMetadata = RequestMetadata> {
  readonly name: string
  readonly payload: TPayload
  readonly metadata?: TMetadata
  readonly expectedResult?: TResult
}
