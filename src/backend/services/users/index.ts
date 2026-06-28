import type { HealthStatus, RequestContext, Result } from '../../contracts'

export interface CreateUserInput {
  context: RequestContext
  email: string
  name?: string
  tenantId: string
}

export interface AssignRoleInput {
  context: RequestContext
  userId: string
  role: string
}

export interface DisableUserInput {
  context: RequestContext
  userId: string
  reason?: string
}

export interface UserOutput {
  userId: string
  email: string
  name?: string
  role?: string
  status?: 'active' | 'disabled'
}

export interface UserService {
  createUser(input: CreateUserInput): Promise<Result<UserOutput>>
  assignRole(input: AssignRoleInput): Promise<Result<UserOutput>>
  disableUser(input: DisableUserInput): Promise<Result<UserOutput>>
  healthCheck(context: RequestContext): Promise<Result<HealthStatus>>
}
