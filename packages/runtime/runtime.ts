import type { RuntimeContext } from "./runtime-context"
import type { RuntimeState } from "./runtime-state"
import type { RuntimeCapability } from "./runtime-capability"

export interface RuntimeContract {
  readonly runtimeId: string
  readonly context: RuntimeContext
  readonly state: RuntimeState
  readonly capabilities: readonly RuntimeCapability[]
}
