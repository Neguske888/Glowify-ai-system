export interface ReasoningMetadata {
  readonly reasoningId: string
  readonly steps?: readonly string[]
  readonly confidence?: number
  readonly summary?: string
}
