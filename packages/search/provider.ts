import type { SearchDocument, SearchIndex } from './document'
import type { SearchQuery, SearchResult } from './query'
import type { SearchAnalyzer } from './analyzer'
import type { SearchSuggestionProvider } from './suggestion'

export interface SearchProvider {
  readonly name: string
  readonly capabilities: ReadonlyArray<string>
  index<T>(document: SearchDocument<T>): Promise<SearchDocument<T>>
  update<T>(document: SearchDocument<T>): Promise<SearchDocument<T>>
  remove(documentId: string): Promise<boolean>
  search<T = unknown>(query: SearchQuery): Promise<SearchResult<T>>
  list(indexName?: string): Promise<ReadonlyArray<SearchIndex>>
  analyzers(): Promise<ReadonlyArray<SearchAnalyzer>>
  suggestionProviders(): Promise<ReadonlyArray<SearchSuggestionProvider>>
}
