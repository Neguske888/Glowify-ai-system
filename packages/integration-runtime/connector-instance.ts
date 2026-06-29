import type { ConnectorContract } from "./connector"
import type { ConnectionContract } from "./connection"

export interface ConnectorInstanceContract {
  readonly connectorInstanceId: string
  readonly connector: ConnectorContract
  readonly connection?: ConnectionContract
}
