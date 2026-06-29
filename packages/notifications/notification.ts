import type { NotificationMetadata } from './types'

export interface Notification<TPayload = unknown> {
  readonly metadata: NotificationMetadata
  readonly payload: TPayload
}
