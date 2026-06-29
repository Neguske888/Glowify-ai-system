import type { KernelContext } from "./kernel-context"
import type { KernelState } from "./kernel-state"
import type { KernelModuleContract } from "./kernel-module"
import type { KernelPluginContract } from "./kernel-plugin"

export interface KernelContract {
  readonly kernelId: string
  readonly context: KernelContext
  readonly state: KernelState
  readonly modules: readonly KernelModuleContract[]
  readonly plugins: readonly KernelPluginContract[]
}
