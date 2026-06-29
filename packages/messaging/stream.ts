export interface StreamContract {
  readonly streamId: string
  readonly name: string
  readonly retentionPolicy?: string
}
