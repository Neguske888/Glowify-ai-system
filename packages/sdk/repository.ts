import type { SDKContract } from "./sdk"
import type { ClientContract } from "./client"

export interface SDKRepository {
  readonly findSDKById: (sdkId: string) => Promise<SDKContract | null>
  readonly findClientById: (clientId: string) => Promise<ClientContract | null>
}
