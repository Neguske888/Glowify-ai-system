import type { AuthResultMeta } from '../types'
import type { AuthUser } from './auth-user'
import type { AuthSession } from './auth-session'
import type { AuthToken } from './auth-token'

export interface LoginResponse {
  user: AuthUser
  session?: AuthSession
  accessToken?: AuthToken
  refreshToken?: AuthToken
  meta?: AuthResultMeta
}

export interface RefreshResponse {
  session?: AuthSession
  accessToken?: AuthToken
  refreshToken?: AuthToken
  meta?: AuthResultMeta
}
