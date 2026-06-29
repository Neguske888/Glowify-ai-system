import type { TemplateContract } from "./template"

export interface ScaffoldContract {
  readonly scaffoldId: string
  readonly template: TemplateContract
  readonly outputPath?: string
}
