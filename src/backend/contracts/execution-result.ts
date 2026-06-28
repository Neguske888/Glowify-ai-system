import type { Result } from './result'

export interface ExecutionResult<T = unknown> extends Result<T> {
  jobId?: string
  status?: 'accepted' | 'rejected' | 'queued' | 'running' | 'completed' | 'failed'
  executedAt?: string
}
