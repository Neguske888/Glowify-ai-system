import type { GatewayMetadata } from "./gateway-context"
import type { RouteContract } from "./route"
import type { EndpointContract } from "./endpoint"

export interface GatewayContract {
  readonly gatewayId: string
  readonly metadata: GatewayMetadata
  readonly routes: readonly RouteContract[]
  readonly endpoints: readonly EndpointContract[]
}
