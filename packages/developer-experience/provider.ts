export interface DeveloperExperienceProviderMetadata {
  readonly providerId: string
  readonly name: string
  readonly version?: string
}

export interface DeveloperExperienceProviderContract {
  readonly providerId: string
  readonly metadata: DeveloperExperienceProviderMetadata
}
