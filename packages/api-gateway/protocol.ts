import type { ProtocolName } from "./types"

export interface ProtocolMetadata {
  readonly protocolId: string
  readonly name: ProtocolName
  readonly version?: string
  readonly description?: string
}
