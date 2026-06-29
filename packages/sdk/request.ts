import type { EndpointContract } from "./endpoint"
import type { OperationContract } from "./operation"

export interface SDKRequest {
  readonly requestId: string
  readonly endpoint: EndpointContract
  readonly operation: OperationContract
  readonly headers?: Readonly<Record<string, string>>
  readonly query?: Readonly<Record<string, string | number | boolean>>
  readonly body?: unknown
}
