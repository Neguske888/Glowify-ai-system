import { InMemoryBootstrapContainer } from './container'
import { MetadataDiagnosticsService } from './diagnostics'
import { GenericEnvironmentValidator } from './environment'
import { AggregatedHealthService } from './health'
import { InMemoryLifecycleManager } from './lifecycle'
import { LifecycleTransitionError, EnvironmentValidationError } from './errors'
import type {
  BootstrapEnvironmentRule,
  BootstrapEnvironmentSnapshot,
  BootstrapHealthReport,
  BootstrapOptions,
  BootstrapRuntime,
  ModuleRegistration,
  ProviderRegistration,
  RepositoryRegistration,
  ServiceRegistration,
} from './types'

export function bootstrap(options: BootstrapOptions): BootstrapRuntime {
  const lifecycle = new InMemoryLifecycleManager()
  const container = new InMemoryBootstrapContainer(options.context.container)
  const health = new AggregatedHealthService(options.childHealthProviders ?? [])
  const environmentKeys = Object.keys(options.context.environment ?? {})
  const diagnosticsService = new MetadataDiagnosticsService(container.registry, lifecycle, environmentKeys)
  const environmentValidator = new GenericEnvironmentValidator(options.context.environment ?? {})

  for (const module of options.modules ?? []) {
    container.registerModule(module)
  }
  for (const service of options.services ?? []) {
    container.registerService(service)
  }
  for (const repository of options.repositories ?? []) {
    container.registerRepository(repository)
  }
  for (const provider of options.providers ?? []) {
    container.registerProvider(provider)
  }

  return {
    get state() {
      return lifecycle.state
    },
    async startup(): Promise<void> {
      try {
        lifecycle.initialize()
        lifecycle.run()
      } catch (error) {
        lifecycle.fail()
        if (error instanceof LifecycleTransitionError) {
          throw error
        }
        throw error
      }
    },
    async shutdown(): Promise<void> {
      try {
        lifecycle.stop()
      } catch (error) {
        lifecycle.fail()
        throw error
      }
    },
    registerModule<T>(registration: ModuleRegistration<T>): BootstrapRuntime {
      container.registerModule(registration)
      return this
    },
    registerService<T>(registration: ServiceRegistration<T>): BootstrapRuntime {
      container.registerService(registration)
      return this
    },
    registerRepository<T>(registration: RepositoryRegistration<T>): BootstrapRuntime {
      container.registerRepository(registration)
      return this
    },
    registerProvider<T>(registration: ProviderRegistration<T>): BootstrapRuntime {
      container.registerProvider(registration)
      return this
    },
    async healthCheck(): Promise<BootstrapHealthReport[]> {
      return health.healthCheck()
    },
    diagnostics() {
      return diagnosticsService.diagnostics()
    },
    validateEnvironment(rules: ReadonlyArray<BootstrapEnvironmentRule>): BootstrapEnvironmentSnapshot {
      const snapshot = environmentValidator.validate(rules)
      if (!snapshot.valid) {
        throw new EnvironmentValidationError(`Missing required environment values: ${snapshot.missing.join(', ')}`)
      }
      return snapshot
    },
  }
}
