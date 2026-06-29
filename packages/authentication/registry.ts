import type { AuthenticationProviderContract } from "./provider"

export interface AuthenticationRegistry {
  readonly providers: readonly AuthenticationProviderContract[]
}
