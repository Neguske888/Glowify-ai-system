import type { Timestamp } from "./types"

export interface ProfileContract {
  readonly profileId: string
  readonly userId: string
  readonly displayName?: string
  readonly avatarUrl?: string
  readonly bio?: string
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}
