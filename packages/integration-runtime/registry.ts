import type { IntegrationProviderContract } from "./integration-provider"

export interface IntegrationRegistry {
  readonly providers: readonly IntegrationProviderContract[]
}
