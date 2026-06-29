import type { ConnectorMetadata } from "./mapping"

export interface ConnectorContract {
  readonly connectorId: string
  readonly metadata: ConnectorMetadata
}
