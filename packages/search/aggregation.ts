import type { AggregationType } from './types'

export interface SearchAggregation {
  readonly name: string
  readonly type: AggregationType
  readonly field?: string
  readonly interval?: string | number
  readonly ranges?: ReadonlyArray<{ readonly from?: number | string; readonly to?: number | string }>
}
