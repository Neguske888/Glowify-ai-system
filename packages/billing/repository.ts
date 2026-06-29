import type { BillingPlanRecord } from './plan'
import type { SubscriptionRecord } from './subscription'
import type { InvoiceRecord } from './invoice'
import type { PaymentRecord } from './payment'
import type { RefundRecord } from './refund'
import type { UsageRecord } from './usage'
import type { CustomerRecord } from './customer'
import type { EntitlementRecord } from './entitlement'
import type { PricingModelRecord } from './pricing'
import type { CheckoutSessionRecord } from './checkout'
import type { CouponRecord } from './coupon'
import type { DiscountRecord } from './discount'
import type { TaxRuleRecord } from './tax'
import type { CreditRecord } from './credit'
import type { TrialRecord } from './trial'
import type {
  BillingAccountId,
  CustomerId,
  InvoiceId,
  PaymentId,
  PlanId,
  RefundId,
  SubscriptionId,
  TenantId,
  UsageRecordId,
  EntitlementId,
  PricingModelId,
  CheckoutSessionId,
  CouponId,
  DiscountId,
  TaxRuleId,
  CreditId,
  TrialId,
} from './types'

export interface BillingRepository {
  saveCustomer(customer: CustomerRecord): Promise<CustomerRecord>
  getCustomer(customerId: CustomerId, tenantId?: TenantId): Promise<CustomerRecord | null>
  listCustomers(tenantId?: TenantId, billingAccountId?: BillingAccountId): Promise<ReadonlyArray<CustomerRecord>>

  savePlan(plan: BillingPlanRecord): Promise<BillingPlanRecord>
  getPlan(planId: PlanId, tenantId?: TenantId): Promise<BillingPlanRecord | null>
  listPlans(tenantId?: TenantId): Promise<ReadonlyArray<BillingPlanRecord>>

  saveSubscription(subscription: SubscriptionRecord): Promise<SubscriptionRecord>
  getSubscription(subscriptionId: SubscriptionId, tenantId?: TenantId): Promise<SubscriptionRecord | null>
  listSubscriptions(tenantId?: TenantId, customerId?: CustomerId): Promise<ReadonlyArray<SubscriptionRecord>>

  saveInvoice(invoice: InvoiceRecord): Promise<InvoiceRecord>
  getInvoice(invoiceId: InvoiceId, tenantId?: TenantId): Promise<InvoiceRecord | null>
  listInvoices(tenantId?: TenantId, customerId?: CustomerId, subscriptionId?: SubscriptionId): Promise<ReadonlyArray<InvoiceRecord>>

  savePayment(payment: PaymentRecord): Promise<PaymentRecord>
  getPayment(paymentId: PaymentId, tenantId?: TenantId): Promise<PaymentRecord | null>
  listPayments(tenantId?: TenantId, customerId?: CustomerId, invoiceId?: InvoiceId): Promise<ReadonlyArray<PaymentRecord>>

  saveRefund(refund: RefundRecord): Promise<RefundRecord>
  getRefund(refundId: RefundId, tenantId?: TenantId): Promise<RefundRecord | null>
  listRefunds(tenantId?: TenantId, paymentId?: PaymentId): Promise<ReadonlyArray<RefundRecord>>

  saveUsage(usage: UsageRecord): Promise<UsageRecord>
  getUsage(usageRecordId: UsageRecordId, tenantId?: TenantId): Promise<UsageRecord | null>
  listUsage(tenantId?: TenantId, subscriptionId?: SubscriptionId): Promise<ReadonlyArray<UsageRecord>>

  saveEntitlement(entitlement: EntitlementRecord): Promise<EntitlementRecord>
  getEntitlement(entitlementId: EntitlementId, tenantId?: TenantId): Promise<EntitlementRecord | null>
  listEntitlements(tenantId?: TenantId, subscriptionId?: SubscriptionId): Promise<ReadonlyArray<EntitlementRecord>>

  savePricingModel(pricingModel: PricingModelRecord): Promise<PricingModelRecord>
  getPricingModel(pricingModelId: PricingModelId, tenantId?: TenantId): Promise<PricingModelRecord | null>
  listPricingModels(tenantId?: TenantId, planId?: PlanId): Promise<ReadonlyArray<PricingModelRecord>>

  saveCheckoutSession(checkoutSession: CheckoutSessionRecord): Promise<CheckoutSessionRecord>
  getCheckoutSession(checkoutSessionId: CheckoutSessionId, tenantId?: TenantId): Promise<CheckoutSessionRecord | null>
  listCheckoutSessions(tenantId?: TenantId, customerId?: CustomerId): Promise<ReadonlyArray<CheckoutSessionRecord>>

  saveCoupon(coupon: CouponRecord): Promise<CouponRecord>
  getCoupon(couponId: CouponId, tenantId?: TenantId): Promise<CouponRecord | null>
  listCoupons(tenantId?: TenantId): Promise<ReadonlyArray<CouponRecord>>

  saveDiscount(discount: DiscountRecord): Promise<DiscountRecord>
  getDiscount(discountId: DiscountId, tenantId?: TenantId): Promise<DiscountRecord | null>
  listDiscounts(tenantId?: TenantId): Promise<ReadonlyArray<DiscountRecord>>

  saveTaxRule(taxRule: TaxRuleRecord): Promise<TaxRuleRecord>
  getTaxRule(taxRuleId: TaxRuleId, tenantId?: TenantId): Promise<TaxRuleRecord | null>
  listTaxRules(tenantId?: TenantId): Promise<ReadonlyArray<TaxRuleRecord>>

  saveCredit(credit: CreditRecord): Promise<CreditRecord>
  getCredit(creditId: CreditId, tenantId?: TenantId): Promise<CreditRecord | null>
  listCredits(tenantId?: TenantId, customerId?: CustomerId): Promise<ReadonlyArray<CreditRecord>>

  saveTrial(trial: TrialRecord): Promise<TrialRecord>
  getTrial(trialId: TrialId, tenantId?: TenantId): Promise<TrialRecord | null>
  listTrials(tenantId?: TenantId, subscriptionId?: SubscriptionId): Promise<ReadonlyArray<TrialRecord>>
}
