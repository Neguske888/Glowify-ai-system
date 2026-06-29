import type { ConfigurationId, ConfigurationSnapshot, ConfigurationVersion } from './types'

export interface ConfigurationRepository<T = unknown> {
  create(snapshot: ConfigurationSnapshot<T>): Promise<ConfigurationSnapshot<T>>
  update(snapshot: ConfigurationSnapshot<T>): Promise<ConfigurationSnapshot<T>>
  remove(configurationId: ConfigurationId): Promise<boolean>
  findById(configurationId: ConfigurationId): Promise<ConfigurationSnapshot<T> | undefined>
  list(): Promise<ReadonlyArray<ConfigurationSnapshot<T>>>
  compare(left: ConfigurationVersion, right: ConfigurationVersion): Promise<number>
  rollback(version: ConfigurationVersion): Promise<ConfigurationSnapshot<T> | undefined>
}

export interface ConfigurationStore<T = unknown> {
  save(snapshot: ConfigurationSnapshot<T>): Promise<void>
  load(configurationId: ConfigurationId): Promise<ConfigurationSnapshot<T> | undefined>
  delete(configurationId: ConfigurationId): Promise<boolean>
}
