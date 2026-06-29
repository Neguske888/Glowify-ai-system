export interface KernelPluginContract {
  readonly pluginId: string
  readonly name: string
  readonly version?: string
  readonly enabled?: boolean
}
