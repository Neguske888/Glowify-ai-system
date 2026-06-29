export interface BatchingContract {
  readonly batchingId: string
  readonly enabled?: boolean
  readonly maxBatchSize?: number
  readonly maxWaitMs?: number
}
