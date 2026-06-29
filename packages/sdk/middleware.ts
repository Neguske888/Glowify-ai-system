import type { SDKRequest } from "./request"
import type { SDKResponse } from "./response"

export interface MiddlewareContract {
  readonly middlewareId: string
  readonly name: string
  readonly handle?: (request: SDKRequest, next: () => Promise<SDKResponse>) => Promise<SDKResponse>
}
