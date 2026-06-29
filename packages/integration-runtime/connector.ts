import type { ConnectorCapability } from "./connector-capability"
import type { ConnectorConfiguration } from "./connector-configuration"

export interface ConnectorContract {
  readonly connectorId: string
  readonly name: string
  readonly capabilities: readonly ConnectorCapability[]
  readonly configuration?: ConnectorConfiguration
}
