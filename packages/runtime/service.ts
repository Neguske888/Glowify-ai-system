import type { RuntimeContract } from "./runtime"

export interface RuntimeService {
  readonly getRuntime: (runtimeId: string) => Promise<RuntimeContract | null>
}
