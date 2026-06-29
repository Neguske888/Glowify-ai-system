import type { SearchDocument, SearchIndex } from './document'
import type { SearchQuery, SearchResult } from './query'

export interface SearchRepository {
  index<T>(document: SearchDocument<T>): Promise<SearchDocument<T>>
  update<T>(document: SearchDocument<T>): Promise<SearchDocument<T>>
  remove(documentId: string): Promise<boolean>
  findById(documentId: string): Promise<SearchDocument | undefined>
  list(indexName?: string): Promise<ReadonlyArray<SearchDocument>>
  search<T = unknown>(query: SearchQuery): Promise<SearchResult<T>>
  count(query?: SearchQuery): Promise<number>
  snapshot(indexName?: string): Promise<ReadonlyArray<SearchIndex>>
}
