import type { SearchSortDirection, SearchSortMode } from './types'

export interface SearchSortField {
  readonly field: string
  readonly direction?: SearchSortDirection
  readonly mode?: SearchSortMode
  readonly customStrategy?: string
}

export interface SearchSort {
  readonly fields: ReadonlyArray<SearchSortField>
}
