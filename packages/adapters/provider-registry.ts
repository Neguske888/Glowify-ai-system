import type { ProviderContract } from "./provider"

export interface ProviderRegistry {
  readonly providers: readonly ProviderContract[]
}
