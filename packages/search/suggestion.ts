import type { SearchQuery } from './query'

export interface SearchSuggestion {
  readonly text: string
  readonly score?: number
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface SearchSuggestionProvider {
  suggest(query: SearchQuery): Promise<ReadonlyArray<SearchSuggestion>>
}
