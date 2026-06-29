import type { RouteContract } from "./route"

export interface RouterContract {
  readonly routerId: string
  readonly routes: readonly RouteContract[]
}
