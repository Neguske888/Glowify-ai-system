export interface DeveloperExtensionMetadata {
  readonly extensionId: string
  readonly name: string
  readonly version?: string
}

export interface ExtensionContract {
  readonly metadata: DeveloperExtensionMetadata
  readonly enabled?: boolean
}
