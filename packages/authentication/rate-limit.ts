export interface RateLimitPolicy {
  readonly rateLimitPolicyId: string
  readonly limit?: number
  readonly intervalSeconds?: number
  readonly burst?: number
}

export interface RateLimitContract {
  readonly rateLimitId: string
  readonly subject?: string
  readonly policy?: RateLimitPolicy
}
