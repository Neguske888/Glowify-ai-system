import type { ClientMetadata } from "./configuration"
import type { EndpointContract } from "./endpoint"

export interface ClientContract {
  readonly clientId: string
  readonly metadata: ClientMetadata
  readonly endpoints: readonly EndpointContract[]
}
