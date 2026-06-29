import type { ConfigurationScope, ConfigurationVersion } from './types'

export interface ConfigurationSchemaField {
  readonly name: string
  readonly type: string
  readonly required?: boolean
  readonly description?: string
}

export interface ConfigurationSchema {
  readonly name: string
  readonly version: ConfigurationVersion
  readonly scope: ConfigurationScope
  readonly fields: ReadonlyArray<ConfigurationSchemaField>
  readonly metadata?: Readonly<Record<string, unknown>>
}
