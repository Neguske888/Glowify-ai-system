import type { HealthStatus, RequestContext, Result } from '../../contracts'

export interface CreateTenantInput {
  context: RequestContext
  name: string
  slug: string
}

export interface UpdateTenantInput {
  context: RequestContext
  tenantId: string
  patch: Record<string, unknown>
}

export interface TenantOutput {
  tenantId: string
  name: string
  slug: string
  status?: 'active' | 'inactive' | 'suspended'
}

export interface TenantService {
  createTenant(input: CreateTenantInput): Promise<Result<TenantOutput>>
  getTenant(context: RequestContext, tenantId: string): Promise<Result<TenantOutput>>
  updateTenant(input: UpdateTenantInput): Promise<Result<TenantOutput>>
  healthCheck(context: RequestContext): Promise<Result<HealthStatus>>
}
