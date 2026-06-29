export interface CheckpointContract {
  readonly checkpointId: string
  readonly streamId?: string
  readonly offset?: number
  readonly capturedAt?: string
}
