import type { EndpointContract } from "./endpoint"

export interface RouteContract {
  readonly routeId: string
  readonly name: string
  readonly pattern: string
  readonly endpoint?: EndpointContract
  readonly enabled?: boolean
}
