import type { AuthorizationContext, AuthorizationResult } from './types'
import type { PolicyEngine } from './policy'

export interface AuthorizationService {
  authorize(context: AuthorizationContext): Promise<AuthorizationResult>
  hasPermission(context: AuthorizationContext, permission: string): Promise<boolean>
  hasRole(context: AuthorizationContext, role: string): Promise<boolean>
}

export interface AuthorizationPolicyService extends AuthorizationService {
  readonly policyEngine: PolicyEngine
}
