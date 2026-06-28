import type { Result, RequestContext } from '../../contracts'
import type { LoginRequest, RefreshRequest } from '../models/auth-request'
import type { LoginResponse, RefreshResponse } from '../models/auth-response'
import type { AuthUser } from '../models/auth-user'
import type { AuthSession } from '../models/auth-session'

export interface AuthProvider {
  signIn(input: LoginRequest): Promise<Result<LoginResponse>>
  signOut(input: { context: RequestContext; sessionId?: string; tokenId?: string }): Promise<Result<void>>
  refresh(input: RefreshRequest): Promise<Result<RefreshResponse>>
  verify(input: { context: RequestContext; sessionId?: string; token?: string }): Promise<Result<AuthSession | AuthUser>>
  resetPassword(input: { context: RequestContext; identifier: string; provider?: string }): Promise<Result<void>>
  changePassword(input: { context: RequestContext; userId: string; currentPassword?: string; newPassword: string; provider?: string }): Promise<Result<void>>
}
