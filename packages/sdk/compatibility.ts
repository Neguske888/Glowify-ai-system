import type { CompatibilityState } from "./types"
import type { VersionMetadata } from "./version"

export interface CompatibilityMetadata {
  readonly compatibilityId: string
  readonly state: CompatibilityState
  readonly sdkVersion?: VersionMetadata
  readonly providerVersion?: string
  readonly reason?: string
}
