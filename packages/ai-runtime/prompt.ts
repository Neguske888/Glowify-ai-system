export interface PromptContract {
  readonly promptId: string
  readonly templateId?: string
  readonly input: Readonly<Record<string, unknown>>
  readonly metadata?: Readonly<Record<string, unknown>>
}
