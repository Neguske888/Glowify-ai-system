import type { VersionString } from "./types"

export interface ModelVersionContract {
  readonly versionId: string
  readonly version: VersionString
  readonly deprecated?: boolean
  readonly releasedAt?: string
}
