export interface TemplateContract {
  readonly templateId: string
  readonly name: string
  readonly description?: string
  readonly files?: readonly string[]
}
