import type { Result } from '../../contracts'
import type { LoginRequest, RefreshRequest, AuthenticatedRequest } from '../models/auth-request'
import type { LoginResponse, RefreshResponse } from '../models/auth-response'

export interface AuthenticationService {
  login(input: LoginRequest): Promise<Result<LoginResponse>>
  logout(input: AuthenticatedRequest): Promise<Result<void>>
  refreshSession(input: RefreshRequest): Promise<Result<RefreshResponse>>
  verifySession(input: AuthenticatedRequest): Promise<Result<AuthenticatedRequest>>
}
