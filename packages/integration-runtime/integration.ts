import type { IntegrationContext } from "./integration-context"
import type { IntegrationSession } from "./integration-session"
import type { ConnectorInstanceContract } from "./connector-instance"

export interface IntegrationContract {
  readonly integrationId: string
  readonly context: IntegrationContext
  readonly session?: IntegrationSession
  readonly connectors: readonly ConnectorInstanceContract[]
}
