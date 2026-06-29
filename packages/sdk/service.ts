import type { SDKContext } from "./context"
import type { ClientContract } from "./client"

export interface SDKService {
  readonly resolveClient: (context: SDKContext) => Promise<ClientContract | null>
}
