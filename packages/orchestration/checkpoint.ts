export interface CheckpointMetadata {
  readonly checkpointId: string
  readonly orchestrationId?: string
  readonly executionId?: string
  readonly taskId?: string
  readonly stageId?: string
  readonly state?: string
  readonly capturedAt?: string
  readonly version?: string
}
