import type { IdentityTimestamp, MembershipStatus } from '../types'

export interface Membership {
  id: string
  organizationId: string
  userId: string
  roleId: string
  joinedAt: IdentityTimestamp
  status: MembershipStatus
}
