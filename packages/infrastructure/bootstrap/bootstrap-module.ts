import type { ServiceCollection } from '../container/types'

export interface BootstrapModule {
  name: string
  register(collection: ServiceCollection): void
}
