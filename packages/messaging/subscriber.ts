export interface SubscriberContract {
  readonly subscriberId: string
  readonly name?: string
  readonly subscriptions?: readonly string[]
}
