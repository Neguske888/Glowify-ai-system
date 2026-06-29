import type { ProjectContract } from "./project"

export interface WorkspaceContract {
  readonly workspaceId: string
  readonly name: string
  readonly projects: readonly ProjectContract[]
}
