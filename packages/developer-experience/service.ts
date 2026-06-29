import type { WorkspaceContract } from "./workspace"

export interface DeveloperExperienceService {
  readonly resolveWorkspace: (workspaceId: string) => Promise<WorkspaceContract | null>
}
