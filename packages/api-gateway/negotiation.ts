export interface NegotiationMetadata {
  readonly negotiationId: string
  readonly contentTypes?: readonly string[]
  readonly languages?: readonly string[]
}
