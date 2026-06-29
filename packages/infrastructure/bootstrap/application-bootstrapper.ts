import { DefaultDependencyInjectionContainer } from '../container/dependency-injection-container'
import { DefaultModuleLoader, type ModuleLoader } from '../container/module-loader'
import { DefaultModuleRegistry, type ModuleRegistry } from '../container/module-registry'
import type { ServiceProvider } from '../container/types'
import type { BootstrapModule } from './bootstrap-module'
import { DefaultLifecycleManager, type LifecycleManager } from '../lifecycle/lifecycle-manager'
import { MapConfigurationProvider, type ConfigurationProvider } from '../configuration/configuration-provider'
import { MapEnvironmentProvider, type EnvironmentProvider } from '../configuration/environment-provider'
import { NoopLogger, type Logger } from '../logging/logger'

export interface BootstrapContext {
  modules?: readonly BootstrapModule[]
  configuration?: ConfigurationProvider
  environment?: EnvironmentProvider
  logger?: Logger
}

export interface BootstrapResult {
  provider: ServiceProvider
  registry: ModuleRegistry
  moduleLoader: ModuleLoader
  lifecycle: LifecycleManager
  configuration: ConfigurationProvider
  environment: EnvironmentProvider
  logger: Logger
}

export class ApplicationBootstrapper {
  bootstrap(context: BootstrapContext = {}): BootstrapResult {
    const registry = new DefaultModuleRegistry()
    for (const module of context.modules ?? []) {
      registry.register(module)
    }

    const moduleLoader = new DefaultModuleLoader(registry)
    const container = new DefaultDependencyInjectionContainer()
    moduleLoader.loadAll(container)

    return {
      provider: container.build(),
      registry,
      moduleLoader,
      lifecycle: new DefaultLifecycleManager(),
      configuration: context.configuration ?? new MapConfigurationProvider(),
      environment: context.environment ?? new MapEnvironmentProvider(),
      logger: context.logger ?? new NoopLogger(),
    }
  }
}
