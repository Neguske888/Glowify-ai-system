export type DocumentId = string
export type TenantId = string
export type OrganizationId = string
export type EntityId = string
export type EntityType = string
export type IndexName = string
export type Version = string
export type Language = string
export type Timestamp = string
export type RequestId = string
export type CorrelationId = string
export type ActorId = string
export type Locale = string
export type Timezone = string
export type Cursor = string
export type QueryId = string
export type SearchTerm = string
export type SearchScore = number

export type SearchSortDirection = 'ascending' | 'descending'
export type SearchSortMode = 'relevance' | 'score' | 'created' | 'updated' | 'custom'
export type FacetType = 'count' | 'term' | 'range'
export type AggregationType =
  | 'count'
  | 'sum'
  | 'average'
  | 'minimum'
  | 'maximum'
  | 'histogram'
  | 'date-histogram'
  | 'term'
  | 'cardinality'

export type SearchCapability =
  | 'full-text'
  | 'exact-match'
  | 'fuzzy'
  | 'prefix'
  | 'autocomplete'
  | 'wildcard'
  | 'phrase'
  | 'semantic'
  | 'vector'
  | 'hybrid'

export interface DocumentMetadata {
  readonly documentId: DocumentId
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly entityId?: EntityId
  readonly entityType?: EntityType
  readonly indexName?: IndexName
  readonly version?: Version
  readonly language?: Language
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}

export interface QueryMetadata {
  readonly requestId?: RequestId
  readonly correlationId?: CorrelationId
  readonly actorId?: ActorId
  readonly tenantId?: TenantId
  readonly locale?: Locale
  readonly timezone?: Timezone
  readonly page?: number
  readonly limit?: number
  readonly cursor?: Cursor
}
