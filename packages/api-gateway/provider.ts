export interface GatewayProviderMetadata {
  readonly providerId: string
  readonly name: string
  readonly version?: string
}

export interface GatewayProviderContract {
  readonly providerId: string
  readonly metadata: GatewayProviderMetadata
}
