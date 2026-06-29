export interface IntegrationContext {
  readonly integrationId: string
  readonly environment?: string
  readonly settings?: Readonly<Record<string, unknown>>
}
