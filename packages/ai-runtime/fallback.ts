export interface FallbackMetadata {
  readonly fallbackId: string
  readonly enabled?: boolean
  readonly reason?: string
  readonly providerSequence?: readonly string[]
}
