import type { StorageProvider } from './provider'

export interface StorageRegistry {
  register(provider: StorageProvider): void
  get(name: string): StorageProvider | undefined
  list(): ReadonlyArray<StorageProvider>
}
