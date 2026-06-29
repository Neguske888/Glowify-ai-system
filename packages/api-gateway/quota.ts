export interface QuotaMetadata {
  readonly quotaId: string
  readonly limit?: number
  readonly consumed?: number
  readonly resetAt?: string
}
