import type { ApprovalState, Timestamp } from "./types"

export interface GovernanceApproval {
  readonly approvalId: string
  readonly policyId?: string
  readonly state: ApprovalState
  readonly approverId?: string
  readonly reason?: string
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}
