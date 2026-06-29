export interface PublisherContract {
  readonly publisherId: string
  readonly name?: string
  readonly channels?: readonly string[]
}
