import type { TemplateContract } from "./template"

export interface ProjectContract {
  readonly projectId: string
  readonly name: string
  readonly templates?: readonly TemplateContract[]
}
