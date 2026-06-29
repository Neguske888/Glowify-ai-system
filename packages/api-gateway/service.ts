import type { GatewayRequest } from "./gateway-request"
import type { GatewayResponse } from "./gateway-response"

export interface GatewayService {
  readonly route: (request: GatewayRequest) => Promise<GatewayResponse>
}
