import type { SDKContract } from "./sdk"

export interface SDKRegistry {
  readonly sdks: readonly SDKContract[]
}
