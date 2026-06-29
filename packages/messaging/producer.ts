export interface ProducerContract {
  readonly producerId: string
  readonly name?: string
  readonly supportedTopics?: readonly string[]
}
