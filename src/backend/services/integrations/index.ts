import type { HealthStatus, RequestContext, Result } from '../../contracts'
import type { IntegrationProvider } from '../../../../packages/integrations/base'
import type { ProviderConnection } from '../../../../packages/integrations/types'

export interface ConnectProviderInput {
  context: RequestContext
  provider: IntegrationProvider
  credentialsRef: string
}

export interface DisconnectProviderInput {
  context: RequestContext
  providerName: string
  connectionId: string
}

export interface ValidateConnectionInput {
  context: RequestContext
  providerName: string
  connectionId: string
}

export interface IntegrationConnectionOutput {
  connection: ProviderConnection
}

export interface IntegrationService {
  connectProvider(input: ConnectProviderInput): Promise<Result<IntegrationConnectionOutput>>
  disconnectProvider(input: DisconnectProviderInput): Promise<Result<boolean>>
  validateConnection(input: ValidateConnectionInput): Promise<Result<boolean>>
  healthCheck(context: RequestContext): Promise<Result<HealthStatus>>
}
