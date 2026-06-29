import type { GovernancePolicy } from "./policy"

export interface GovernanceRegistry {
  readonly policies: readonly GovernancePolicy[]
}
