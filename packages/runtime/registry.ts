import type { RuntimeContract } from "./runtime"

export interface RuntimeRegistry {
  readonly runtimes: readonly RuntimeContract[]
}
