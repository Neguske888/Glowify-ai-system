import type {
  GetSecretInput,
  ListSecretsInput,
  RevokeSecretInput,
  RotateSecretInput,
  SecretMetadata,
  SecretValue,
  StoreSecretInput,
} from '../../../packages/secret-management'

export interface SecretManager {
  storeSecret(input: StoreSecretInput): Promise<SecretMetadata>
  getSecret(input: GetSecretInput): Promise<SecretValue | null>
  rotateSecret(input: RotateSecretInput): Promise<SecretMetadata>
  revokeSecret(input: RevokeSecretInput): Promise<void>
  listSecrets(input: ListSecretsInput): Promise<SecretMetadata[]>
}
