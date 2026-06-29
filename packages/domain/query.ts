import type { ComparisonOperator, SearchCriteria, SortDirection } from './types'

export interface Command<T = unknown> {
  readonly name: string
  readonly payload: T
}

export interface Query<TResponse = unknown, TCriteria = unknown> {
  readonly name: string
  readonly criteria: TCriteria
  execute(): Promise<TResponse>
}

export interface Pagination {
  readonly page: number
  readonly pageSize: number
}

export interface PageInfo {
  readonly page: number
  readonly pageSize: number
  readonly total: number
  readonly totalPages: number
}

export interface PaginatedResult<T> {
  readonly items: ReadonlyArray<T>
  readonly pageInfo: PageInfo
}

export interface FilterCondition<T = unknown> {
  readonly field: keyof T | string
  readonly operator: ComparisonOperator
  readonly value: unknown
}

export interface Filter<T = unknown> {
  readonly conditions: ReadonlyArray<FilterCondition<T>>
}

export interface SortField<T = unknown> {
  readonly field: keyof T | string
  readonly direction: SortDirection
}

export interface Sort<T = unknown> {
  readonly fields: ReadonlyArray<SortField<T>>
}

export interface Search<T = unknown> extends SearchCriteria {
  readonly scope?: keyof T | string
}
