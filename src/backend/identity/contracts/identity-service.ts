import type { Result, RequestContext } from '../../contracts'
import type { IdentityListOptions, IdentityListResult } from '../types'
import type { User } from '../models/user'
import type { Organization } from '../models/organization'
import type { Membership } from '../models/membership'
import type { Role } from '../models/role'
import type { Permission } from '../models/permission'
import type { Session } from '../models/session'

export interface CreateUserInput {
  context: RequestContext
  user: Pick<User, 'tenantId' | 'email'> & Partial<Pick<User, 'displayName' | 'avatarUrl' | 'status'>>
}

export interface UpdateUserInput {
  context: RequestContext
  userId: string
  changes: Partial<Pick<User, 'displayName' | 'avatarUrl' | 'status' | 'email'>>
}

export interface DeactivateUserInput {
  context: RequestContext
  userId: string
  reason?: string
}

export interface GetUserInput {
  context: RequestContext
  userId: string
}

export interface ListUsersInput {
  context: RequestContext
  options?: IdentityListOptions
}

export interface CreateOrganizationInput {
  context: RequestContext
  organization: Pick<Organization, 'tenantId' | 'name' | 'slug' | 'timezone' | 'currency'> & Partial<Pick<Organization, 'subscriptionPlan' | 'status'>>
}

export interface UpdateOrganizationInput {
  context: RequestContext
  organizationId: string
  changes: Partial<Pick<Organization, 'name' | 'slug' | 'timezone' | 'currency' | 'subscriptionPlan' | 'status'>>
}

export interface ArchiveOrganizationInput {
  context: RequestContext
  organizationId: string
  reason?: string
}

export interface GetOrganizationInput {
  context: RequestContext
  organizationId: string
}

export interface AddMemberInput {
  context: RequestContext
  organizationId: string
  userId: string
  roleId: string
}

export interface RemoveMemberInput {
  context: RequestContext
  membershipId: string
}

export interface UpdateMemberRoleInput {
  context: RequestContext
  membershipId: string
  roleId: string
}

export interface ListMembersInput {
  context: RequestContext
  organizationId: string
  options?: IdentityListOptions
}

export interface CreateRoleInput {
  context: RequestContext
  role: Pick<Role, 'tenantId' | 'name'> & Partial<Pick<Role, 'description' | 'organizationId' | 'isSystem' | 'permissions'>>
}

export interface UpdateRoleInput {
  context: RequestContext
  roleId: string
  changes: Partial<Pick<Role, 'name' | 'description' | 'organizationId' | 'isSystem'>>
}

export interface DeleteRoleInput {
  context: RequestContext
  roleId: string
}

export interface AssignPermissionsInput {
  context: RequestContext
  roleId: string
  permissions: Array<Pick<Permission, 'id' | 'key'>>
}

export interface ListPermissionsInput {
  context: RequestContext
  options?: IdentityListOptions
}

export interface ValidatePermissionInput {
  context: RequestContext
  userId: string
  organizationId: string
  permissionKey: string
}

export interface CreateSessionInput {
  context: RequestContext
  session: Pick<Session, 'userId' | 'organizationId' | 'expiresAt'> & Partial<Pick<Session, 'device' | 'ipAddress' | 'userAgent' | 'revokedAt'>>
}

export interface RevokeSessionInput {
  context: RequestContext
  sessionId: string
  reason?: string
}

export interface GetSessionInput {
  context: RequestContext
  sessionId: string
}

export interface ListSessionsInput {
  context: RequestContext
  userId?: string
  organizationId?: string
  options?: IdentityListOptions
}

export interface IdentityService {
  createUser(input: CreateUserInput): Promise<Result<User>>
  updateUser(input: UpdateUserInput): Promise<Result<User>>
  deactivateUser(input: DeactivateUserInput): Promise<Result<User>>
  getUser(input: GetUserInput): Promise<Result<User>>
  listUsers(input: ListUsersInput): Promise<Result<IdentityListResult<User>>>
}

export interface OrganizationService {
  createOrganization(input: CreateOrganizationInput): Promise<Result<Organization>>
  updateOrganization(input: UpdateOrganizationInput): Promise<Result<Organization>>
  archiveOrganization(input: ArchiveOrganizationInput): Promise<Result<Organization>>
  getOrganization(input: GetOrganizationInput): Promise<Result<Organization>>
}

export interface MembershipService {
  addMember(input: AddMemberInput): Promise<Result<Membership>>
  removeMember(input: RemoveMemberInput): Promise<Result<Membership>>
  updateMemberRole(input: UpdateMemberRoleInput): Promise<Result<Membership>>
  listMembers(input: ListMembersInput): Promise<Result<IdentityListResult<Membership>>>
}

export interface RoleService {
  createRole(input: CreateRoleInput): Promise<Result<Role>>
  updateRole(input: UpdateRoleInput): Promise<Result<Role>>
  deleteRole(input: DeleteRoleInput): Promise<Result<void>>
  assignPermissions(input: AssignPermissionsInput): Promise<Result<Role>>
}

export interface PermissionService {
  listPermissions(input: ListPermissionsInput): Promise<Result<IdentityListResult<Permission>>>
  validatePermission(input: ValidatePermissionInput): Promise<Result<boolean>>
}

export interface SessionService {
  createSession(input: CreateSessionInput): Promise<Result<Session>>
  revokeSession(input: RevokeSessionInput): Promise<Result<Session>>
  getSession(input: GetSessionInput): Promise<Result<Session>>
  listSessions(input: ListSessionsInput): Promise<Result<IdentityListResult<Session>>>
}
