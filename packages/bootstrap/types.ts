import type { DependencyInjectionContainer, ServiceFactory, ServiceLifetime, ServiceToken } from '../infrastructure/container/types'
import type { IntegrationProvider } from '../integrations/base'
import type { SecretManager } from '../secret-management'
import type { Clock, Configuration, Logger } from '../../src/backend/utils'

export type BootstrapLifecycleState = 'created' | 'initializing' | 'running' | 'stopping' | 'stopped' | 'failed'

export type BootstrapContractKind = 'module' | 'service' | 'repository' | 'provider'

export interface BootstrapMetadata {
  name: string
  description?: string
  source?: 'infrastructure' | 'integrations' | 'secret-management' | 'backend'
}

export interface ModuleRegistration<T = unknown> {
  token: ServiceToken<T>
  kind: BootstrapContractKind
  lifetime?: ServiceLifetime
  factory?: ServiceFactory<T>
  metadata: BootstrapMetadata
}

export interface ProviderRegistration<T = unknown> {
  token: ServiceToken<T>
  kind: 'provider'
  lifetime?: ServiceLifetime
  factory?: ServiceFactory<T>
  metadata: BootstrapMetadata
}

export interface ServiceRegistration<T = unknown> {
  token: ServiceToken<T>
  kind: 'service'
  lifetime?: ServiceLifetime
  factory?: ServiceFactory<T>
  metadata: BootstrapMetadata
}

export interface RepositoryRegistration<T = unknown> {
  token: ServiceToken<T>
  kind: 'repository'
  lifetime?: ServiceLifetime
  factory?: ServiceFactory<T>
  metadata: BootstrapMetadata
}

export interface BootstrapEnvironmentRule {
  key: string
  required?: boolean
  description?: string
  validate?: (value: string | undefined) => boolean
}

export interface BootstrapEnvironmentSnapshot {
  readonly values: ReadonlyArray<[string, string | undefined]>
  readonly missing: ReadonlyArray<string>
  readonly valid: boolean
}

export interface BootstrapHealthReport {
  name: string
  status: 'healthy' | 'degraded' | 'unhealthy'
  details?: string
}

export interface BootstrapDiagnosticsReport {
  state: BootstrapLifecycleState
  modules: ReadonlyArray<BootstrapMetadata>
  services: ReadonlyArray<BootstrapMetadata>
  repositories: ReadonlyArray<BootstrapMetadata>
  providers: ReadonlyArray<BootstrapMetadata>
  environment: ReadonlyArray<string>
}

export interface BootstrapChildHealthProvider {
  name: string
  healthCheck(): Promise<BootstrapHealthReport> | BootstrapHealthReport
}

export interface BootstrapContext {
  container: DependencyInjectionContainer
  logger?: Logger
  clock?: Clock
  configuration?: Configuration
  secretManager?: SecretManager
  integrationProviders?: ReadonlyArray<IntegrationProvider>
  environment?: Record<string, string | undefined>
}

export interface BootstrapRuntime {
  readonly state: BootstrapLifecycleState
  startup(): Promise<void>
  shutdown(): Promise<void>
  registerModule<T = unknown>(registration: ModuleRegistration<T>): this
  registerService<T = unknown>(registration: ServiceRegistration<T>): this
  registerRepository<T = unknown>(registration: RepositoryRegistration<T>): this
  registerProvider<T = unknown>(registration: ProviderRegistration<T>): this
  healthCheck(): Promise<BootstrapHealthReport[]>
  diagnostics(): BootstrapDiagnosticsReport
  validateEnvironment(rules: ReadonlyArray<BootstrapEnvironmentRule>): BootstrapEnvironmentSnapshot
}

export interface BootstrapOptions {
  readonly context: BootstrapContext
  readonly childHealthProviders?: ReadonlyArray<BootstrapChildHealthProvider>
  readonly modules?: ReadonlyArray<ModuleRegistration>
  readonly services?: ReadonlyArray<ServiceRegistration>
  readonly repositories?: ReadonlyArray<RepositoryRegistration>
  readonly providers?: ReadonlyArray<ProviderRegistration>
}
