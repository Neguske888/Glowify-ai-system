import type { NotificationMessage } from './message'
import type { DeliveryRecord } from './delivery'
import type { NotificationChannelName } from './types'

export interface NotificationProvider {
  readonly name: string
  readonly channels: ReadonlyArray<NotificationChannelName>
  send<TPayload>(message: NotificationMessage<TPayload>): Promise<DeliveryRecord>
}
