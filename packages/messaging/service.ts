import type { MessageContract } from "./message"

export interface MessagingService {
  readonly publish: (message: MessageContract) => Promise<void>
}
