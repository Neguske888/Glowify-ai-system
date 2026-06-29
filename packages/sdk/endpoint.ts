import type { TransportContract } from "./transport"

export interface EndpointContract {
  readonly endpointId: string
  readonly name: string
  readonly path: string
  readonly method?: string
  readonly transport?: TransportContract
}
