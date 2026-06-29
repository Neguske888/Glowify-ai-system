import type { NotificationMetadata } from './types'
import type { Attachment } from './attachment'

export interface NotificationMessage<TPayload = unknown> {
  readonly metadata: NotificationMetadata
  readonly payload: TPayload
  readonly attachments?: ReadonlyArray<Attachment>
}
