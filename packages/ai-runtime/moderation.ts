export interface ModerationMetadata {
  readonly moderationId: string
  readonly category?: string
  readonly flagged?: boolean
  readonly reason?: string
}
