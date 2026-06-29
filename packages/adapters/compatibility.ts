import type { CompatibilityState } from "./types"
import type { AdapterVersion } from "./version"

export interface CompatibilityContract {
  readonly compatibilityId: string
  readonly state: CompatibilityState
  readonly adapterVersion?: AdapterVersion
  readonly providerVersion?: string
  readonly reason?: string
}
