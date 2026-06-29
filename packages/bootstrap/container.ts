import type { DependencyInjectionContainer, ServiceToken } from '../infrastructure/container/types'
import type { ModuleRegistration, ProviderRegistration, RepositoryRegistration, ServiceRegistration } from './types'
import { InMemoryBootstrapRegistry } from './registry'

export interface BootstrapContainer {
  registerModule<T>(registration: ModuleRegistration<T>): void
  registerService<T>(registration: ServiceRegistration<T>): void
  registerRepository<T>(registration: RepositoryRegistration<T>): void
  registerProvider<T>(registration: ProviderRegistration<T>): void
  resolve<T>(token: ServiceToken<T>): T
  tryResolve<T>(token: ServiceToken<T>): T | undefined
  readonly registry: InMemoryBootstrapRegistry
}

export class InMemoryBootstrapContainer implements BootstrapContainer {
  readonly registry = new InMemoryBootstrapRegistry()

  constructor(private readonly container: DependencyInjectionContainer) {}

  registerModule<T>(registration: ModuleRegistration<T>): void {
    this.registry.registerModule(registration)
    if (registration.factory) {
      this.container.register({
        token: registration.token,
        lifetime: registration.lifetime ?? 'singleton',
        factory: registration.factory,
      })
    }
  }

  registerService<T>(registration: ServiceRegistration<T>): void {
    this.registry.registerService(registration)
    if (registration.factory) {
      this.container.register({
        token: registration.token,
        lifetime: registration.lifetime ?? 'singleton',
        factory: registration.factory,
      })
    }
  }

  registerRepository<T>(registration: RepositoryRegistration<T>): void {
    this.registry.registerRepository(registration)
    if (registration.factory) {
      this.container.register({
        token: registration.token,
        lifetime: registration.lifetime ?? 'singleton',
        factory: registration.factory,
      })
    }
  }

  registerProvider<T>(registration: ProviderRegistration<T>): void {
    this.registry.registerProvider(registration)
    if (registration.factory) {
      this.container.register({
        token: registration.token,
        lifetime: registration.lifetime ?? 'singleton',
        factory: registration.factory,
      })
    }
  }

  resolve<T>(token: ServiceToken<T>): T {
    return this.container.resolve(token)
  }

  tryResolve<T>(token: ServiceToken<T>): T | undefined {
    return this.container.tryResolve(token)
  }
}
