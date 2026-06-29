export interface RuntimeProviderMetadata {
  readonly providerId: string
  readonly name: string
  readonly version?: string
}

export interface RuntimeProviderContract {
  readonly providerId: string
  readonly metadata: RuntimeProviderMetadata
}
