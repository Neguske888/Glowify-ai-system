export interface MessagingProviderMetadata {
  readonly providerId: string
  readonly name: string
  readonly version?: string
}

export interface MessagingProviderContract {
  readonly providerId: string
  readonly metadata: MessagingProviderMetadata
}
