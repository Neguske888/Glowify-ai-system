import type { EventMetadata, EventPayload } from './types'

export interface EventEnvelope<T = unknown> extends EventPayload<T> {
  readonly metadata: EventMetadata
}

export interface DeadLetterEnvelope<T = unknown> extends EventEnvelope<T> {
  readonly deadLetterReason: string
  readonly failedAt: string
  readonly attemptCount: number
}
