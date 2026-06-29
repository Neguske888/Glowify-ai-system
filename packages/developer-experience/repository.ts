import type { WorkspaceContract } from "./workspace"
import type { ProjectContract } from "./project"

export interface DeveloperExperienceRepository {
  readonly findWorkspaceById: (workspaceId: string) => Promise<WorkspaceContract | null>
  readonly findProjectById: (projectId: string) => Promise<ProjectContract | null>
}
