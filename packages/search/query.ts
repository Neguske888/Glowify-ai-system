import type { QueryMetadata, SearchCapability, SearchTerm } from './types'
import type { SearchFilter } from './filter'
import type { SearchSort } from './sort'
import type { SearchFacet } from './facet'
import type { SearchAggregation } from './aggregation'
import type { SearchPagination } from './pagination'

export interface SearchQuery {
  readonly queryId?: string
  readonly term?: SearchTerm
  readonly capabilities?: ReadonlyArray<SearchCapability>
  readonly metadata?: QueryMetadata
  readonly filter?: SearchFilter
  readonly sort?: SearchSort
  readonly facets?: ReadonlyArray<SearchFacet>
  readonly aggregations?: ReadonlyArray<SearchAggregation>
  readonly pagination?: SearchPagination
  readonly highlight?: boolean
  readonly suggestions?: boolean
}

export interface SearchResult<T = unknown> {
  readonly items: ReadonlyArray<T>
  readonly score?: number
  readonly highlights?: ReadonlyArray<string>
  readonly snippets?: ReadonlyArray<string>
  readonly matchedFields?: ReadonlyArray<string>
  readonly explanation?: Readonly<Record<string, unknown>>
  readonly pagination?: SearchPagination
  readonly facets?: ReadonlyArray<SearchFacetResult>
  readonly aggregations?: ReadonlyArray<SearchAggregationResult>
}

export interface SearchFacetResult {
  readonly name: string
  readonly values: ReadonlyArray<{ readonly key: string; readonly count: number }>
}

export interface SearchAggregationResult {
  readonly name: string
  readonly type: string
  readonly value?: number | string | ReadonlyArray<unknown>
}
