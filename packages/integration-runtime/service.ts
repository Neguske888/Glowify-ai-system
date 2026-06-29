import type { IntegrationContract } from "./integration"

export interface IntegrationService {
  readonly resolveIntegration: (integrationId: string) => Promise<IntegrationContract | null>
}
