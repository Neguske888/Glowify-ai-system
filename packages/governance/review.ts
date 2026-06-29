import type { Timestamp } from "./types"

export interface ReviewLifecycle {
  readonly reviewId: string
  readonly state: "requested" | "in_review" | "approved" | "rejected" | "closed"
  readonly reviewerId?: string
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}
