import type { DocumentMetadata } from './types'

export interface SearchDocument<TContent = unknown> {
  readonly metadata: DocumentMetadata
  readonly content: TContent
  readonly fields?: Readonly<Record<string, unknown>>
}

export interface SearchIndex {
  readonly name: string
  readonly version?: string
  readonly documents?: ReadonlyArray<SearchDocument>
  readonly metadata?: Readonly<Record<string, unknown>>
}
