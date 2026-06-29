import type { ConfigurationSnapshot } from './types'

export interface ConfigurationSource<T = unknown> {
  readonly name: string
  load(): Promise<ConfigurationSnapshot<T> | undefined>
  publish(snapshot: ConfigurationSnapshot<T>): Promise<void>
}
