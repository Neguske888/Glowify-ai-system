import type { RuntimeEnvironment } from "./runtime-environment"
import type { RuntimeProfile } from "./runtime-profile"

export interface RuntimeContext {
  readonly runtimeId: string
  readonly environment?: RuntimeEnvironment
  readonly profile?: RuntimeProfile
  readonly settings?: Readonly<Record<string, unknown>>
}
