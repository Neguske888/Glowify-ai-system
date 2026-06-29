import type { BillingMetadata, TenantId, Timestamp, WebhookEventId } from './types'

export interface BillingWebhookEvent extends BillingMetadata {
  readonly webhookEventId: WebhookEventId
  readonly tenantId?: TenantId
  readonly provider: string
  readonly type: string
  readonly receivedAt?: Timestamp
  readonly signature?: string
  readonly payload: Readonly<Record<string, unknown>>
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface BillingWebhookReceipt {
  readonly webhookEventId: WebhookEventId
  readonly accepted: boolean
  readonly reason?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}
