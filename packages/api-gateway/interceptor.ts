import type { GatewayRequest } from "./gateway-request"
import type { GatewayResponse } from "./gateway-response"

export interface InterceptorContract {
  readonly interceptorId: string
  readonly name: string
  readonly request?: (request: GatewayRequest) => void
  readonly response?: (response: GatewayResponse) => void
}
