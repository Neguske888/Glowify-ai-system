import type { AdapterContract } from "./adapter"
import type { AdapterContext } from "./adapter-context"

export interface AdapterFactory {
  readonly factoryId: string
  readonly create: (context: AdapterContext) => AdapterContract
}
