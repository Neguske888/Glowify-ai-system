export type ApprovalMode = "automatic" | "manual" | "multi-stage" | "quorum" | "delegated" | "emergency_override"

export type ApprovalState = "pending" | "approved" | "rejected" | "escalated" | "expired" | "overridden"

export interface ApprovalMetadata {
  readonly approvalId: string
  readonly orchestrationId?: string
  readonly executionId?: string
  readonly actorId?: string
  readonly approverIds?: readonly string[]
  readonly mode: ApprovalMode
  readonly state: ApprovalState
  readonly createdAt?: string
  readonly updatedAt?: string
}

export interface ApprovalContract {
  readonly metadata: ApprovalMetadata
  readonly reason?: string
  readonly notes?: readonly string[]
}
