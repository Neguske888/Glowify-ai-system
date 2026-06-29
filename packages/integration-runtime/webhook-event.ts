export interface WebhookEventContract {
  readonly webhookEventId: string
  readonly webhookId?: string
  readonly eventType: string
  readonly receivedAt?: string
}
