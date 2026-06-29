export interface CachingMetadata {
  readonly cacheId: string
  readonly enabled?: boolean
  readonly ttlSeconds?: number
  readonly varyBy?: readonly string[]
}
