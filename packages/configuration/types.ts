export type ConfigurationId = string
export type TenantId = string
export type OrganizationId = string
export type TeamId = string
export type UserId = string
export type EnvironmentName = string
export type ConfigurationVersion = string
export type Checksum = string
export type Timestamp = string

export type ConfigurationScope = 'global' | 'tenant' | 'organization' | 'team' | 'user' | 'environment'
export type FeatureFlagStrategy =
  | 'boolean'
  | 'percentage-rollout'
  | 'allow-list'
  | 'deny-list'
  | 'role-based'
  | 'permission-based'
  | 'tenant-based'
  | 'organization-based'
  | 'custom-rule'

export interface ConfigurationMetadata {
  readonly configurationId: ConfigurationId
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly environment?: EnvironmentName
  readonly version?: ConfigurationVersion
  readonly createdAt?: Timestamp
  readonly updatedAt?: Timestamp
  readonly updatedBy?: UserId
  readonly source?: string
  readonly checksum?: Checksum
}

export interface EnvironmentProfile {
  readonly environment: EnvironmentName
  readonly labels?: ReadonlyArray<string>
  readonly metadata?: Readonly<Record<string, unknown>>
}

export interface RuntimeConfiguration {
  readonly scope: ConfigurationScope
  readonly environment: EnvironmentProfile
  readonly metadata?: ConfigurationMetadata
}

export interface ConfigurationSnapshot<T = unknown> {
  readonly metadata: ConfigurationMetadata
  readonly scope: ConfigurationScope
  readonly version: ConfigurationVersion
  readonly data: T
}

export interface FeatureFlagTarget {
  readonly tenantId?: TenantId
  readonly organizationId?: OrganizationId
  readonly teamId?: TeamId
  readonly userId?: UserId
  readonly role?: string
  readonly permission?: string
  readonly environment?: EnvironmentName
}

export interface FeatureFlagEvaluation {
  readonly flagKey: string
  readonly enabled: boolean
  readonly strategy: FeatureFlagStrategy
  readonly reason?: string
  readonly metadata?: ConfigurationMetadata
}
