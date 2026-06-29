import type { GatewayRequest } from "./gateway-request"
import type { GatewayResponse } from "./gateway-response"

export interface MiddlewareContract {
  readonly middlewareId: string
  readonly name: string
  readonly before?: (request: GatewayRequest) => void
  readonly after?: (response: GatewayResponse) => void
  readonly handle?: (request: GatewayRequest, next: () => Promise<GatewayResponse>) => Promise<GatewayResponse>
}
