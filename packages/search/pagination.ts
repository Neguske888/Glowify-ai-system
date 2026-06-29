export interface SearchPagination {
  readonly page?: number
  readonly limit?: number
  readonly cursor?: string
  readonly total?: number
  readonly hasNextPage?: boolean
  readonly hasPreviousPage?: boolean
}
