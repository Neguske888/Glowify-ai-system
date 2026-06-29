import type { MessageMetadata } from "./message-metadata"
import type { MessageHeader } from "./message-header"

export interface MessageContract {
  readonly messageId: string
  readonly metadata: MessageMetadata
  readonly headers?: readonly MessageHeader[]
  readonly body?: unknown
}
