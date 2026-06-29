import type { IdentityMetadata } from "./identity"

export interface UserContract {
  readonly userId: string
  readonly identity: IdentityMetadata
  readonly username?: string
  readonly locale?: string
  readonly timeZone?: string
}
