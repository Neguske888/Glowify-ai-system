export interface AuthenticationProviderMetadata {
  readonly providerId: string
  readonly name: string
  readonly version?: string
  readonly protocols?: readonly string[]
}

export interface AuthenticationProviderContract {
  readonly metadata: AuthenticationProviderMetadata
  readonly capabilities?: readonly string[]
}
