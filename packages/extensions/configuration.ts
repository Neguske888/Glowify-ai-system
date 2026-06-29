export interface ExtensionConfiguration {
  readonly name: string
  readonly values: Readonly<Record<string, unknown>>
}
