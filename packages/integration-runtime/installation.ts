import type { ConnectorContract } from "./connector"

export interface InstallationContract {
  readonly installationId: string
  readonly connector: ConnectorContract
  readonly active?: boolean
}
