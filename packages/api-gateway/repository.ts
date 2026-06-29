import type { GatewayContract } from "./gateway"
import type { RouteContract } from "./route"

export interface GatewayRepository {
  readonly findGatewayById: (gatewayId: string) => Promise<GatewayContract | null>
  readonly findRouteById: (routeId: string) => Promise<RouteContract | null>
}
