import type { ConnectorContract } from "./connector"

export interface ConnectorRegistry {
  readonly connectors: readonly ConnectorContract[]
}
