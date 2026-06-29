export interface AdapterConfiguration {
  readonly configurationId: string
  readonly values: Readonly<Record<string, unknown>>
}
