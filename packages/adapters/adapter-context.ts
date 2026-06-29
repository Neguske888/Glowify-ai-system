import type { ProviderMetadata } from "./provider-metadata"
import type { AdapterMetadata } from "./adapter-metadata"

export interface AdapterContext {
  readonly metadata: AdapterMetadata
  readonly provider?: ProviderMetadata
  readonly environment?: string
  readonly settings?: Readonly<Record<string, unknown>>
}
