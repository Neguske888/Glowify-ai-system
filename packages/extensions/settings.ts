export interface ExtensionSettings {
  readonly enabled: boolean
  readonly options: Readonly<Record<string, unknown>>
}
