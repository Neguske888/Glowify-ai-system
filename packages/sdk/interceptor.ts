import type { SDKRequest } from "./request"
import type { SDKResponse } from "./response"

export interface InterceptorContract {
  readonly interceptorId: string
  readonly name: string
  readonly before?: (request: SDKRequest) => void
  readonly after?: (response: SDKResponse) => void
}
