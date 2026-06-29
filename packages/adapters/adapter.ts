import type { AdapterMetadata } from "./adapter-metadata"
import type { AdapterCapability } from "./adapter-capability"
import type { AdapterLifecycle } from "./adapter-lifecycle"

export interface AdapterContract {
  readonly adapterId: string
  readonly metadata: AdapterMetadata
  readonly capabilities: readonly AdapterCapability[]
  readonly lifecycle?: AdapterLifecycle
}
