import type { CompatibilityState, VersionString } from "./types"

export interface CompatibilityContract {
  readonly compatibilityId: string
  readonly state: CompatibilityState
  readonly currentVersion?: VersionString
  readonly targetVersion?: VersionString
}
