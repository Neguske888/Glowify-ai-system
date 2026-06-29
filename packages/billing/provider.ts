import type { BillingWebhookEvent } from './webhook'
import type { BillingPlanRecord } from './plan'
import type { SubscriptionRecord } from './subscription'
import type { InvoiceRecord } from './invoice'
import type { PaymentRecord } from './payment'
import type { RefundRecord } from './refund'
import type { UsageRecord } from './usage'
import type { EntitlementRecord } from './entitlement'
import type { PricingModelRecord, PricingQuote } from './pricing'
import type { CheckoutSessionRecord } from './checkout'
import type { CustomerRecord } from './customer'
import type { BillingAccountId, PlanId, SubscriptionId, TenantId, InvoiceId, PaymentId } from './types'

export interface BillingProvider {
  readonly name: string
  readonly version?: string

  createCustomer(customer: CustomerRecord): Promise<CustomerRecord>
  updateCustomer(customer: CustomerRecord): Promise<CustomerRecord>
  createPlan(plan: BillingPlanRecord): Promise<BillingPlanRecord>
  syncPlan(planId: PlanId, tenantId?: TenantId): Promise<BillingPlanRecord>
  createSubscription(subscription: SubscriptionRecord): Promise<SubscriptionRecord>
  updateSubscription(subscription: SubscriptionRecord): Promise<SubscriptionRecord>
  cancelSubscription(subscriptionId: SubscriptionId, tenantId?: TenantId): Promise<SubscriptionRecord>
  createInvoice(invoice: InvoiceRecord): Promise<InvoiceRecord>
  finalizeInvoice(invoiceId: InvoiceId, tenantId?: TenantId): Promise<InvoiceRecord>
  createPayment(payment: PaymentRecord): Promise<PaymentRecord>
  capturePayment(paymentId: PaymentId, tenantId?: TenantId): Promise<PaymentRecord>
  refundPayment(refund: RefundRecord): Promise<RefundRecord>
  recordUsage(usage: UsageRecord): Promise<UsageRecord>
  resolveEntitlements(tenantId?: TenantId, subscriptionId?: SubscriptionId): Promise<ReadonlyArray<EntitlementRecord>>
  quotePricing(pricing: PricingQuote): Promise<PricingQuote>
  createCheckoutSession(checkoutSession: CheckoutSessionRecord): Promise<CheckoutSessionRecord>
  verifyWebhook(event: BillingWebhookEvent): Promise<boolean>
  syncBillingAccount(billingAccountId: BillingAccountId, tenantId?: TenantId): Promise<void>
  getPricingModels(tenantId?: TenantId, planId?: PlanId): Promise<ReadonlyArray<PricingModelRecord>>
  getSubscription(subscriptionId: SubscriptionId, tenantId?: TenantId): Promise<SubscriptionRecord | null>
}
