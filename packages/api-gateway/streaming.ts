export interface StreamingMetadata {
  readonly streamingId: string
  readonly enabled?: boolean
  readonly chunked?: boolean
  readonly eventDriven?: boolean
}
