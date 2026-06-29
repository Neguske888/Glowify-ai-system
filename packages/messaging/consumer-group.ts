export interface ConsumerGroupContract {
  readonly consumerGroupId: string
  readonly name: string
  readonly members?: readonly string[]
}
