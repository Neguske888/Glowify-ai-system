import type { AIProviderContract } from "./provider"
import type { ModelContract } from "./model"

export interface AIRuntimeService {
  readonly providers: readonly AIProviderContract[]
  readonly resolveModel: (modelId: string) => Promise<ModelContract | null>
}
