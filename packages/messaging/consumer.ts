export interface ConsumerContract {
  readonly consumerId: string
  readonly groupId?: string
  readonly subscribedTopics?: readonly string[]
}
