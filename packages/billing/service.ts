import type { SubscriptionRecord } from './subscription'
import type { InvoiceRecord } from './invoice'
import type { UsageRecord } from './usage'
import type { BillingWebhookEvent, BillingWebhookReceipt } from './webhook'
import type { PlanId, SubscriptionId, TenantId, Timestamp } from './types'

export interface ValidateSubscriptionInput {
  readonly tenantId: TenantId
  readonly subscriptionId?: SubscriptionId
  readonly planId?: PlanId
  readonly at?: Timestamp
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface ValidateSubscriptionResult {
  readonly valid: boolean
  readonly subscription?: SubscriptionRecord
  readonly reason?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface GetPlanLimitsResult {
  readonly planId: PlanId
  readonly limits: Readonly<Record<string, number | string | boolean>>
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface RecordUsageInput {
  readonly tenantId: TenantId
  readonly subscriptionId?: SubscriptionId
  readonly usage: UsageRecord
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface RecordUsageResult {
  readonly usage: UsageRecord
  readonly overLimit?: boolean
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface SyncSubscriptionInput {
  readonly tenantId: TenantId
  readonly subscriptionId: SubscriptionId
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface SyncSubscriptionResult {
  readonly subscription: SubscriptionRecord
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface HandleBillingEventResult {
  readonly accepted: boolean
  readonly invoice?: InvoiceRecord
  readonly subscription?: SubscriptionRecord
  readonly usage?: UsageRecord
  readonly webhook?: BillingWebhookReceipt
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface BillingService {
  validateSubscription(input: ValidateSubscriptionInput): Promise<ValidateSubscriptionResult>
  getPlanLimits(planId: PlanId, tenantId?: TenantId): Promise<GetPlanLimitsResult>
  recordUsage(input: RecordUsageInput): Promise<RecordUsageResult>
  syncSubscription(input: SyncSubscriptionInput): Promise<SyncSubscriptionResult>
  handleBillingEvent(event: BillingWebhookEvent): Promise<HandleBillingEventResult>
}
