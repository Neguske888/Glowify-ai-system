import type { VersionString } from "./types"

export interface PromptVersionContract {
  readonly promptVersionId: string
  readonly version: VersionString
  readonly content: string
  readonly changelog?: string
}
