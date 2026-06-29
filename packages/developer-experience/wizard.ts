import type { PromptContract } from "./prompt"

export interface WizardContract {
  readonly wizardId: string
  readonly prompts: readonly PromptContract[]
}
