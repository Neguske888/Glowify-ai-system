export interface Pagination {
  page: number
  pageSize: number
}

export interface CursorPagination {
  limit: number
  cursor?: string
  direction?: 'forward' | 'backward'
}
