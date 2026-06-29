import type { GatewayProviderContract } from "./provider"

export interface GatewayRegistry {
  readonly providers: readonly GatewayProviderContract[]
}
