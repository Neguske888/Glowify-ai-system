export interface AuthenticationProviderMetadata {
  readonly providerId: string
  readonly name: string
  readonly version?: string
  readonly supportedProtocols?: readonly string[]
  readonly tenantScoped?: boolean
}

export interface AuthenticationProviderContract {
  readonly metadata: AuthenticationProviderMetadata
  readonly capabilities?: readonly string[]
}
