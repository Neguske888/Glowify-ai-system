export interface WebhookContract {
  readonly webhookId: string
  readonly name: string
  readonly endpoint?: string
  readonly enabled?: boolean
}
