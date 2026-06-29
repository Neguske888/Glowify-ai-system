import type { AgentMetadata, Score } from './types'

export interface FeedbackEntry {
  readonly feedbackId: string
  readonly sourceId?: string
  readonly targetId?: string
  readonly score?: Score
  readonly message?: string
  readonly metadata?: AgentMetadata
}

export interface FeedbackCollector {
  collect(feedback: FeedbackEntry): Promise<FeedbackEntry>
  list(targetId?: string): Promise<ReadonlyArray<FeedbackEntry>>
}
