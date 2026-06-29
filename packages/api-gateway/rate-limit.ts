export interface RateLimitMetadata {
  readonly rateLimitId: string
  readonly limit?: number
  readonly windowSeconds?: number
  readonly burst?: number
}
