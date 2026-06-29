import type { RuntimeContract } from "./runtime"
import type { KernelContract } from "./kernel"

export interface RuntimeRepository {
  readonly findRuntimeById: (runtimeId: string) => Promise<RuntimeContract | null>
  readonly findKernelById: (kernelId: string) => Promise<KernelContract | null>
}
