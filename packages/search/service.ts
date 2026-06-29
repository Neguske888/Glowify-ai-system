import type { SearchQuery, SearchResult } from './query'
import type { SearchProvider } from './provider'
import type { SearchSuggestionProvider, SearchSuggestion } from './suggestion'
import type { SearchAnalyzer } from './analyzer'
import type { SearchDocument } from './document'

export interface SearchService {
  search<T = unknown>(query: SearchQuery): Promise<SearchResult<T>>
  index<T>(document: SearchDocument<T>): Promise<SearchDocument<T>>
  update<T>(document: SearchDocument<T>): Promise<SearchDocument<T>>
  remove(documentId: string): Promise<boolean>
  suggestions(query: SearchQuery): Promise<ReadonlyArray<SearchSuggestion>>
  analyzers(): Promise<ReadonlyArray<SearchAnalyzer>>
  providers(): Promise<ReadonlyArray<SearchProvider>>
}

export interface SearchDispatcher {
  dispatch<T = unknown>(query: SearchQuery): Promise<SearchResult<T>>
}
