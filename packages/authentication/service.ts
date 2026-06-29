import type { AuthenticationContract } from "./authentication"
import type { IdentityContract } from "./identity"

export interface AuthenticationService {
  readonly authenticate: (identityId: string) => Promise<AuthenticationContract | null>
  readonly resolveIdentity: (identityId: string) => Promise<IdentityContract | null>
}
