import type { HttpMethod } from "./types"
import type { GatewayContext } from "./gateway-context"
import type { RequestContext } from "./request-context"
import type { EndpointContract } from "./endpoint"

export interface GatewayRequest {
  readonly requestId: string
  readonly method: HttpMethod
  readonly path: string
  readonly endpoint?: EndpointContract
  readonly context: GatewayContext
  readonly requestContext?: RequestContext
  readonly headers?: Readonly<Record<string, string>>
  readonly query?: Readonly<Record<string, string | number | boolean>>
  readonly body?: unknown
}
