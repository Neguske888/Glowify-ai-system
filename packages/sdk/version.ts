import type { VersionString } from "./types"

export interface VersionMetadata {
  readonly versionId: string
  readonly version: VersionString
  readonly deprecated?: boolean
}
