import type { DomainId } from './types'
import type { Specification } from './specification'
import type { Pagination, PaginatedResult, Filter, Sort, Search } from './query'

export interface Repository<TAggregate, TId = DomainId> {
  create(entity: TAggregate): Promise<TAggregate>
  update(entity: TAggregate): Promise<TAggregate>
  delete(id: TId, hard?: boolean): Promise<boolean>
  restore(id: TId): Promise<boolean>
  exists(id: TId): Promise<boolean>
  count(specification?: Specification<TAggregate>): Promise<number>
  findById(id: TId): Promise<TAggregate | undefined>
  findMany(options?: FindManyOptions<TAggregate>): Promise<ReadonlyArray<TAggregate>>
  paginate(options?: PaginateOptions<TAggregate>): Promise<PaginatedResult<TAggregate>>
}

export interface FindManyOptions<T> {
  readonly specification?: Specification<T>
  readonly filter?: Filter<T>
  readonly sort?: Sort<T>
  readonly search?: Search<T>
  readonly limit?: number
  readonly offset?: number
}

export interface PaginateOptions<T> extends FindManyOptions<T> {
  readonly pagination?: Pagination
}
