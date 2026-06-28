import type { IntegrationProvider } from './base'
import type { IntegrationResult } from './types'

export interface GetOrdersInput {
  readonly tenantId: string
  readonly cursor?: string
  readonly limit?: number
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface GetCustomersInput {
  readonly tenantId: string
  readonly cursor?: string
  readonly limit?: number
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface GetProductsInput {
  readonly tenantId: string
  readonly cursor?: string
  readonly limit?: number
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface UpdateInventoryInput {
  readonly tenantId: string
  readonly productId: string
  readonly quantity: number
  readonly locationId?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface RegisterWebhookInput {
  readonly tenantId: string
  readonly eventType: string
  readonly callbackUrl: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface CommerceProvider extends IntegrationProvider {
  getOrders(input: GetOrdersInput): Promise<IntegrationResult<CommerceOrderPage>>
  getCustomers(input: GetCustomersInput): Promise<IntegrationResult<CommerceCustomerPage>>
  getProducts(input: GetProductsInput): Promise<IntegrationResult<CommerceProductPage>>
  updateInventory(input: UpdateInventoryInput): Promise<IntegrationResult<CommerceInventoryUpdateResponse>>
  registerWebhook(input: RegisterWebhookInput): Promise<IntegrationResult<CommerceWebhookRegistrationResponse>>
}

export interface CommerceOrderPage {
  readonly items: ReadonlyArray<Record<string, unknown>>
  readonly nextCursor?: string
}

export interface CommerceCustomerPage {
  readonly items: ReadonlyArray<Record<string, unknown>>
  readonly nextCursor?: string
}

export interface CommerceProductPage {
  readonly items: ReadonlyArray<Record<string, unknown>>
  readonly nextCursor?: string
}

export interface CommerceInventoryUpdateResponse {
  readonly productId: string
  readonly quantity: number
  readonly updated: boolean
}

export interface CommerceWebhookRegistrationResponse {
  readonly webhookId: string
  readonly eventType: string
  readonly callbackUrl: string
}
