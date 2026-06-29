import type { SearchProvider } from './provider'
import type { SearchIndex } from './document'

export interface SearchRegistry {
  register(provider: SearchProvider): void
  get(name: string): SearchProvider | undefined
  list(): ReadonlyArray<SearchProvider>
}

export interface SearchIndexRegistry {
  register(index: SearchIndex): void
  get(name: string): SearchIndex | undefined
  list(): ReadonlyArray<SearchIndex>
}
