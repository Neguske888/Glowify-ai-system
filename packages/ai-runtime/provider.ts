import type { ModelContract } from "./model"

export interface AIProviderMetadata {
  readonly providerId: string
  readonly name: string
  readonly version?: string
  readonly supportedCapabilities?: readonly string[]
  readonly tenantScoped?: boolean
}

export interface AIProviderContract {
  readonly metadata: AIProviderMetadata
  readonly models: readonly ModelContract[]
}
