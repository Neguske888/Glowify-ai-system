import type { IntegrationContract } from "./integration"
import type { ConnectorContract } from "./connector"

export interface IntegrationRepository {
  readonly findIntegrationById: (integrationId: string) => Promise<IntegrationContract | null>
  readonly findConnectorById: (connectorId: string) => Promise<ConnectorContract | null>
}
