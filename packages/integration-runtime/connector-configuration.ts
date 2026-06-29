export interface ConnectorConfiguration {
  readonly configurationId: string
  readonly values: Readonly<Record<string, unknown>>
}
