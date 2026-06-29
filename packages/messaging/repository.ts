import type { MessageContract } from "./message"
import type { StreamContract } from "./stream"

export interface MessagingRepository {
  readonly findMessageById: (messageId: string) => Promise<MessageContract | null>
  readonly findStreamById: (streamId: string) => Promise<StreamContract | null>
}
