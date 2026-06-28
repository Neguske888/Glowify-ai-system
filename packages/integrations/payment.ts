import type { IntegrationProvider } from './base'
import type { IntegrationResult, WebhookVerificationResult } from './types'

export interface CreateCustomerInput {
  readonly tenantId: string
  readonly externalReference?: string
  readonly email?: string
  readonly name?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface CreateCheckoutInput {
  readonly tenantId: string
  readonly customerId?: string
  readonly amount: number
  readonly currency: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface ChargeInput {
  readonly tenantId: string
  readonly customerId?: string
  readonly amount: number
  readonly currency: string
  readonly reference?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface RefundInput {
  readonly tenantId: string
  readonly chargeId: string
  readonly amount?: number
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface PaymentProvider extends IntegrationProvider {
  createCustomer(input: CreateCustomerInput): Promise<IntegrationResult<PaymentCustomerResponse>>
  createCheckout(input: CreateCheckoutInput): Promise<IntegrationResult<PaymentCheckoutResponse>>
  charge(input: ChargeInput): Promise<IntegrationResult<PaymentChargeResponse>>
  refund(input: RefundInput): Promise<IntegrationResult<PaymentRefundResponse>>
  verifyWebhook(input: PaymentWebhookInput): Promise<IntegrationResult<WebhookVerificationResult>>
}

export interface PaymentCustomerResponse {
  readonly customerId: string
  readonly externalReference?: string
}

export interface PaymentCheckoutResponse {
  readonly checkoutId: string
  readonly checkoutUrl?: string
  readonly status: 'created' | 'pending' | 'completed'
}

export interface PaymentChargeResponse {
  readonly chargeId: string
  readonly status: 'succeeded' | 'pending' | 'failed'
  readonly amount: number
  readonly currency: string
}

export interface PaymentRefundResponse {
  readonly refundId: string
  readonly status: 'succeeded' | 'pending' | 'failed'
  readonly amount: number
}

export interface PaymentWebhookInput {
  readonly tenantId: string
  readonly headers: Readonly<Record<string, string | undefined>>
  readonly body: string
  readonly signature?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}
