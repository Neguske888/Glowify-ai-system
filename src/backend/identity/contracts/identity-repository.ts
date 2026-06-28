import type { IdentityListOptions, IdentityListResult } from '../types'
import type { User } from '../models/user'
import type { Organization } from '../models/organization'
import type { Membership } from '../models/membership'
import type { Role } from '../models/role'
import type { Permission } from '../models/permission'
import type { Session } from '../models/session'

export interface IdentityRepositoryQueryContext {
  tenantId: string
  organizationId?: string
}

export interface IdentityRepository<T, CreateInput = Partial<T>, UpdateInput = Partial<T>> {
  create(input: CreateInput, context: IdentityRepositoryQueryContext): Promise<T>
  update(id: string, input: UpdateInput, context: IdentityRepositoryQueryContext): Promise<T | null>
  delete(id: string, context: IdentityRepositoryQueryContext): Promise<boolean>
  findById(id: string, context: IdentityRepositoryQueryContext): Promise<T | null>
  list(options: IdentityListOptions, context: IdentityRepositoryQueryContext): Promise<IdentityListResult<T>>
}

export type UserRepository = IdentityRepository<User, Partial<User>, Partial<User>>
export type OrganizationRepository = IdentityRepository<Organization, Partial<Organization>, Partial<Organization>>
export type MembershipRepository = IdentityRepository<Membership, Partial<Membership>, Partial<Membership>>
export type RoleRepository = IdentityRepository<Role, Partial<Role>, Partial<Role>>
export type PermissionRepository = IdentityRepository<Permission, Partial<Permission>, Partial<Permission>>
export type SessionRepository = IdentityRepository<Session, Partial<Session>, Partial<Session>>
