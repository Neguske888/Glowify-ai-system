import type { MessageContract } from "./message"

export interface ChatModelContract {
  readonly modelId: string
  readonly supportsTools?: boolean
  readonly supportsStreaming?: boolean
  readonly messages?: readonly MessageContract[]
}
