import type { ConfigurationScope, ConfigurationSnapshot, ConfigurationVersion } from './types'

export interface ConfigurationProvider<T = unknown> {
  load(scope?: ConfigurationScope): Promise<ConfigurationSnapshot<T> | undefined>
  resolve<TValue = unknown>(key: string, scope?: ConfigurationScope): Promise<TValue | undefined>
  merge?(snapshot: ConfigurationSnapshot<T>): Promise<ConfigurationSnapshot<T>>
  rollback?(version: ConfigurationVersion): Promise<ConfigurationSnapshot<T> | undefined>
}
