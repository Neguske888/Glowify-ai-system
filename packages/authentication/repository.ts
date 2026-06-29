import type { AuthenticationContract } from "./authentication"
import type { IdentityContract } from "./identity"

export interface AuthenticationRepository {
  readonly findAuthenticationById: (authenticationId: string) => Promise<AuthenticationContract | null>
  readonly findIdentityById: (identityId: string) => Promise<IdentityContract | null>
}
