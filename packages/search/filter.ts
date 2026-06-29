export type SearchFilterOperator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'contains'
  | 'range'
  | 'date-range'
  | 'bool'
  | 'nested'
  | 'and'
  | 'or'
  | 'not'

export interface SearchFilterCondition {
  readonly field: string
  readonly operator: SearchFilterOperator
  readonly value?: unknown
  readonly values?: ReadonlyArray<unknown>
  readonly children?: ReadonlyArray<SearchFilterCondition>
}

export interface SearchFilter {
  readonly conditions: ReadonlyArray<SearchFilterCondition>
}
