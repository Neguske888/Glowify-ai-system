export interface QueueContract {
  readonly queueId: string
  readonly name: string
  readonly durable?: boolean
}
