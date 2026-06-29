import type { VersionString } from "./types"

export interface AdapterVersion {
  readonly adapterId: string
  readonly version: VersionString
  readonly deprecated?: boolean
}
