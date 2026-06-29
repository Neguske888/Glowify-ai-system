export interface IntegrationProviderMetadata {
  readonly providerId: string
  readonly name: string
  readonly version?: string
}

export interface IntegrationProviderContract {
  readonly providerId: string
  readonly metadata: IntegrationProviderMetadata
}
