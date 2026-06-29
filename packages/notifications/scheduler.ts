import type { NotificationMessage } from './message'

export interface NotificationSchedule<TPayload = unknown> {
  readonly scheduleId: string
  readonly executeAt: string
  readonly message: NotificationMessage<TPayload>
}

export interface NotificationScheduler {
  schedule<TPayload>(schedule: NotificationSchedule<TPayload>): Promise<NotificationSchedule<TPayload>>
  cancel(scheduleId: string): Promise<boolean>
  list(): Promise<ReadonlyArray<NotificationSchedule>>
}
