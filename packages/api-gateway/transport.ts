import type { TransportName } from "./types"

export interface TransportMetadata {
  readonly transportId: string
  readonly name: TransportName
  readonly description?: string
  readonly enabled?: boolean
}
