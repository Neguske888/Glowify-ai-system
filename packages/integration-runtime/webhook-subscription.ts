export interface WebhookSubscriptionContract {
  readonly webhookSubscriptionId: string
  readonly webhookId?: string
  readonly subscribedEventTypes?: readonly string[]
}
