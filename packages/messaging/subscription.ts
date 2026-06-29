export interface SubscriptionContract {
  readonly subscriptionId: string
  readonly consumerId?: string
  readonly topicName?: string
  readonly queueName?: string
}
