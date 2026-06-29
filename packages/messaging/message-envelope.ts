import type { MessageContract } from "./message"

export interface MessageEnvelope {
  readonly envelopeId: string
  readonly message: MessageContract
  readonly receivedAt?: string
  readonly traceId?: string
}
