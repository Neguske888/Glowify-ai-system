import type { ModelFamily } from "./model-family"
import type { ModelCapability } from "./model-capability"
import type { ModelVersionContract } from "./model-version"

export interface ModelContract {
  readonly modelId: string
  readonly providerId?: string
  readonly family: ModelFamily
  readonly capabilities: readonly ModelCapability[]
  readonly versions?: readonly ModelVersionContract[]
}
