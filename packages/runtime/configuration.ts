export interface RuntimeConfiguration {
  readonly configurationId: string
  readonly values: Readonly<Record<string, unknown>>
}
