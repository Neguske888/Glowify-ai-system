import type { HealthStatus, RequestContext, Result } from '../../contracts'

export interface CreateCheckoutInput {
  context: RequestContext
  customerId?: string
  planId: string
  metadata?: Record<string, unknown>
}

export interface VerifyPaymentInput {
  context: RequestContext
  paymentId: string
  webhookPayload?: unknown
}

export interface CreateSubscriptionInput {
  context: RequestContext
  customerId: string
  planId: string
}

export interface CancelSubscriptionInput {
  context: RequestContext
  subscriptionId: string
  reason?: string
}

export interface BillingCheckoutOutput {
  checkoutId: string
  checkoutUrl?: string
}

export interface BillingPaymentOutput {
  verified: boolean
  paymentId: string
}

export interface BillingSubscriptionOutput {
  subscriptionId: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
}

export interface BillingService {
  createCheckout(input: CreateCheckoutInput): Promise<Result<BillingCheckoutOutput>>
  verifyPayment(input: VerifyPaymentInput): Promise<Result<BillingPaymentOutput>>
  createSubscription(input: CreateSubscriptionInput): Promise<Result<BillingSubscriptionOutput>>
  cancelSubscription(input: CancelSubscriptionInput): Promise<Result<BillingSubscriptionOutput>>
  healthCheck(context: RequestContext): Promise<Result<HealthStatus>>
}
