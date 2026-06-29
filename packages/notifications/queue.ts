import type { NotificationMessage } from './message'
import type { NotificationMetadata } from './types'

export interface NotificationQueueEntry<TPayload = unknown> {
  readonly message: NotificationMessage<TPayload>
  readonly queuedAt: string
  readonly metadata: NotificationMetadata
}

export interface NotificationQueue {
  enqueue<TPayload>(entry: NotificationQueueEntry<TPayload>): Promise<NotificationQueueEntry<TPayload>>
  dequeue(): Promise<NotificationQueueEntry | undefined>
  peek(): Promise<NotificationQueueEntry | undefined>
}
