import type { ProtocolMetadata } from "./protocol"
import type { TransportMetadata } from "./transport"

export interface EndpointContract {
  readonly endpointId: string
  readonly name: string
  readonly path: string
  readonly method?: string
  readonly protocol?: ProtocolMetadata
  readonly transport?: TransportMetadata
}
