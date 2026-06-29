import type { ClientContract } from "./client"
import type { SDKContext } from "./context"

export interface ClientFactoryContract {
  readonly factoryId: string
  readonly create: (context: SDKContext) => ClientContract
}
