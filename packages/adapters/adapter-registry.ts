import type { AdapterContract } from "./adapter"

export interface AdapterRegistry {
  readonly adapters: readonly AdapterContract[]
}
