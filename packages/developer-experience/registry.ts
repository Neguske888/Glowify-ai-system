import type { PluginContract } from "./plugin"
import type { ExtensionContract } from "./extension"

export interface DeveloperExperienceRegistry {
  readonly plugins: readonly PluginContract[]
  readonly extensions: readonly ExtensionContract[]
}
