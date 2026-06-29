import type { AdapterContract } from "./adapter"
import type { AdapterContext } from "./adapter-context"

export interface AdapterService {
  readonly register: (adapter: AdapterContract) => Promise<void>
  readonly resolve: (context: AdapterContext) => Promise<AdapterContract | null>
}
