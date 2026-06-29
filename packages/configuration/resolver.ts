import type { ConfigurationScope, ConfigurationSnapshot } from './types'

export interface ConfigurationResolver<T = unknown> {
  resolve(scope?: ConfigurationScope): Promise<ConfigurationSnapshot<T> | undefined>
  compare(left: ConfigurationSnapshot<T>, right: ConfigurationSnapshot<T>): Promise<number>
  snapshot(scope?: ConfigurationScope): Promise<ConfigurationSnapshot<T> | undefined>
}
