import type { ConfigurationMetadata, FeatureFlagStrategy, FeatureFlagTarget, Timestamp } from './types'

export interface FeatureFlagRule {
  readonly id: string
  readonly strategy: FeatureFlagStrategy
  readonly enabled?: boolean
  readonly percentage?: number
  readonly allowList?: ReadonlyArray<string>
  readonly denyList?: ReadonlyArray<string>
  readonly roles?: ReadonlyArray<string>
  readonly permissions?: ReadonlyArray<string>
  readonly tenants?: ReadonlyArray<string>
  readonly organizations?: ReadonlyArray<string>
  readonly condition?: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface FeatureFlag {
  readonly key: string
  readonly description?: string
  readonly defaultValue: boolean
  readonly rules: ReadonlyArray<FeatureFlagRule>
  readonly target?: FeatureFlagTarget
  readonly metadata?: ConfigurationMetadata
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
}
