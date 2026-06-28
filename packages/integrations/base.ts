import type {
  CredentialsInput,
  DisconnectInput,
  HealthCheckInput,
  IntegrationResult,
  IntegrationContext,
  ProviderConnection,
} from './types'

export interface IntegrationProvider {
  authenticate(context: IntegrationContext): Promise<IntegrationResult<boolean>>
  validateCredentials(input: CredentialsInput): Promise<IntegrationResult<boolean>>
  connect(input: CredentialsInput): Promise<IntegrationResult<ProviderConnection>>
  disconnect(input: DisconnectInput): Promise<IntegrationResult<boolean>>
  healthCheck(input: HealthCheckInput): Promise<IntegrationResult<boolean>>
}
