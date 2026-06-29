import type { ProviderMetadata } from "./provider-metadata"

export interface ProviderContract {
  readonly providerId: string
  readonly metadata: ProviderMetadata
}
