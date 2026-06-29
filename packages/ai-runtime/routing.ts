import type { RoutingStrategy } from "./types"

export interface RoutingMetadata {
  readonly routingId: string
  readonly strategy: RoutingStrategy
  readonly targetProviderId?: string
  readonly targetModelId?: string
}
