import type { OrderingStrategy } from "./types"

export interface OrderingContract {
  readonly orderingId: string
  readonly strategy: OrderingStrategy
  readonly key?: string
}
