import type { MessagingProviderContract } from "./provider"

export interface MessagingRegistry {
  readonly providers: readonly MessagingProviderContract[]
}
