export type SocialLoginProvider = "google" | "apple" | "github" | "microsoft" | "facebook" | "x" | "custom"

export interface SocialLoginMetadata {
  readonly provider: SocialLoginProvider
  readonly accountLinking?: boolean
  readonly profileSync?: boolean
}

export interface SocialLoginContract {
  readonly metadata: SocialLoginMetadata
  readonly federated?: boolean
}
