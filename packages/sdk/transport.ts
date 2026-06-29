import type { TransportProtocol } from "./types"

export interface TransportContract {
  readonly transportId: string
  readonly protocol: TransportProtocol
  readonly endpoint?: string
}
