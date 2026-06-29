import type { PromptVersionContract } from "./prompt-version"

export interface PromptTemplateContract {
  readonly templateId: string
  readonly name: string
  readonly versions: readonly PromptVersionContract[]
}
