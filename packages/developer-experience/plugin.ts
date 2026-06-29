export interface DeveloperPluginMetadata {
  readonly pluginId: string
  readonly name: string
  readonly version?: string
}

export interface PluginContract {
  readonly metadata: DeveloperPluginMetadata
  readonly enabled?: boolean
}
