import type { ModelContract } from "./model"
import type { PromptTemplateContract } from "./prompt-template"

export interface AIRuntimeRepository {
  readonly findModelById: (modelId: string) => Promise<ModelContract | null>
  readonly findPromptTemplateById: (templateId: string) => Promise<PromptTemplateContract | null>
}
