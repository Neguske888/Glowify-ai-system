import type { Policy } from './policy'
import type { Role } from './role'
import type { Permission } from './permission'
import type { Resource } from './types'

export interface PolicyRepository {
  getById(policyId: string): Promise<Policy | undefined>
  list(): Promise<ReadonlyArray<Policy>>
  save(policy: Policy): Promise<void>
  remove(policyId: string): Promise<boolean>
}

export interface RoleRepository {
  getByName(name: string): Promise<Role | undefined>
  list(): Promise<ReadonlyArray<Role>>
  save(role: Role): Promise<void>
  remove(name: string): Promise<boolean>
}

export interface PermissionRepository {
  getByName(name: string): Promise<Permission | undefined>
  list(): Promise<ReadonlyArray<Permission>>
  save(permission: Permission): Promise<void>
  remove(name: string): Promise<boolean>
}

export interface ResourceRepository {
  getById(resourceId: string): Promise<Resource | undefined>
  list(): Promise<ReadonlyArray<Resource>>
  save(resource: Resource): Promise<void>
  remove(resourceId: string): Promise<boolean>
}
