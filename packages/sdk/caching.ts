export interface CacheMetadata {
  readonly cacheId: string
  readonly key?: string
  readonly ttlSeconds?: number
  readonly staleWhileRevalidateSeconds?: number
}
