export type ProviderKind =
  | 'ai'
  | 'payment'
  | 'commerce'
  | 'messaging'
  | 'marketing'
  | 'analytics'

export type TenantId = string
export type ProviderName = string
export type CapabilityName = string

export interface IntegrationContext {
  readonly tenantId: TenantId
  readonly requestId?: string
  readonly actorId?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface CredentialsInput {
  readonly tenantId: TenantId
  readonly provider: ProviderName
  readonly namespace?: string
  readonly secretRef?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface ConnectionInput {
  readonly tenantId: TenantId
  readonly provider: ProviderName
  readonly credentialsRef: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface DisconnectInput {
  readonly tenantId: TenantId
  readonly provider: ProviderName
  readonly connectionId: string
  readonly reason?: string
}

export interface HealthCheckInput {
  readonly tenantId: TenantId
  readonly provider: ProviderName
  readonly connectionId?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface IntegrationResult<TData = unknown> {
  readonly ok: boolean
  readonly data?: TData
  readonly error?: IntegrationError
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface IntegrationError {
  readonly code: string
  readonly message: string
  readonly retriable: boolean
  readonly provider?: ProviderName
  readonly details?: Readonly<Record<string, unknown>>
}

export interface ProviderHealthStatus {
  readonly healthy: boolean
  readonly provider: ProviderName
  readonly connectionId?: string
  readonly checkedAt: string
  readonly details?: Readonly<Record<string, unknown>>
  readonly error?: IntegrationError
}

export interface ProviderConnection {
  readonly provider: ProviderName
  readonly connectionId: string
  readonly tenantId: TenantId
  readonly connectedAt: string
  readonly updatedAt: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface WebhookVerificationInput {
  readonly tenantId: TenantId
  readonly provider: ProviderName
  readonly headers: Readonly<Record<string, string | undefined>>
  readonly body: string
  readonly signature?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface WebhookVerificationResult {
  readonly valid: boolean
  readonly provider: ProviderName
  readonly eventType?: string
  readonly eventId?: string
  readonly tenantId?: TenantId
  readonly error?: IntegrationError
}
