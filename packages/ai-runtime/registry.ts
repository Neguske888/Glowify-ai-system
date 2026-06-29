import type { AIProviderContract } from "./provider"

export interface AIRuntimeRegistry {
  readonly providers: readonly AIProviderContract[]
}
