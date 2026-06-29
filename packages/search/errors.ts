export type SearchErrorCode =
  | 'SEARCH_INDEX_NOT_FOUND'
  | 'SEARCH_DOCUMENT_NOT_FOUND'
  | 'SEARCH_QUERY_INVALID'
  | 'SEARCH_PROVIDER_UNAVAILABLE'
  | 'SEARCH_ANALYZER_FAILED'
  | 'SEARCH_SUGGESTION_FAILED'
  | 'SEARCH_AGGREGATION_FAILED'

export interface SearchError {
  readonly code: SearchErrorCode
  readonly message: string
  readonly details?: Readonly<Record<string, unknown>>
  readonly cause?: unknown
}
