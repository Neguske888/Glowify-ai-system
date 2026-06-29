import type { AdapterContract } from "./adapter"
import type { ProviderContract } from "./provider"

export interface AdapterRepository {
  readonly findAdapterById: (adapterId: string) => Promise<AdapterContract | null>
  readonly findProviderById: (providerId: string) => Promise<ProviderContract | null>
}
