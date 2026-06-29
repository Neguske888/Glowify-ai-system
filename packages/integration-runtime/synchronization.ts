import type { SynchronizationJob } from "./synchronization-job"

export interface SynchronizationContract {
  readonly synchronizationId: string
  readonly jobs: readonly SynchronizationJob[]
}
