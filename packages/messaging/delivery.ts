import type { DeliveryState } from "./types"

export interface DeliveryContract {
  readonly deliveryId: string
  readonly messageId: string
  readonly state: DeliveryState
  readonly deliveredAt?: string
}
