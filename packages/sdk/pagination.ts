export interface PaginationMetadata {
  readonly page?: number
  readonly pageSize?: number
  readonly totalItems?: number
  readonly totalPages?: number
}

export interface UsageMetadata {
  readonly pagination?: PaginationMetadata
  readonly requestCount?: number
}
