export interface ResidencyPolicy {
  readonly residencyId: string
  readonly regions?: readonly string[]
  readonly allowedCountries?: readonly string[]
  readonly restrictedCountries?: readonly string[]
  readonly localityRequired?: boolean
}
