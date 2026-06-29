import type { BootstrapMetadata, ModuleRegistration, ProviderRegistration, RepositoryRegistration, ServiceRegistration } from './types'

export interface BootstrapRegistry {
  registerModule<T>(registration: ModuleRegistration<T>): void
  registerService<T>(registration: ServiceRegistration<T>): void
  registerRepository<T>(registration: RepositoryRegistration<T>): void
  registerProvider<T>(registration: ProviderRegistration<T>): void
  modules(): ReadonlyArray<ModuleRegistration>
  services(): ReadonlyArray<ServiceRegistration>
  repositories(): ReadonlyArray<RepositoryRegistration>
  providers(): ReadonlyArray<ProviderRegistration>
  metadata(): ReadonlyArray<BootstrapMetadata>
}

export class InMemoryBootstrapRegistry implements BootstrapRegistry {
  private readonly moduleRegistrations: ModuleRegistration[] = []
  private readonly serviceRegistrations: ServiceRegistration[] = []
  private readonly repositoryRegistrations: RepositoryRegistration[] = []
  private readonly providerRegistrations: ProviderRegistration[] = []

  registerModule<T>(registration: ModuleRegistration<T>): void {
    this.moduleRegistrations.push(registration)
  }

  registerService<T>(registration: ServiceRegistration<T>): void {
    this.serviceRegistrations.push(registration)
  }

  registerRepository<T>(registration: RepositoryRegistration<T>): void {
    this.repositoryRegistrations.push(registration)
  }

  registerProvider<T>(registration: ProviderRegistration<T>): void {
    this.providerRegistrations.push(registration)
  }

  modules(): ReadonlyArray<ModuleRegistration> {
    return [...this.moduleRegistrations]
  }

  services(): ReadonlyArray<ServiceRegistration> {
    return [...this.serviceRegistrations]
  }

  repositories(): ReadonlyArray<RepositoryRegistration> {
    return [...this.repositoryRegistrations]
  }

  providers(): ReadonlyArray<ProviderRegistration> {
    return [...this.providerRegistrations]
  }

  metadata(): ReadonlyArray<BootstrapMetadata> {
    return [
      ...this.moduleRegistrations.map((registration) => registration.metadata),
      ...this.serviceRegistrations.map((registration) => registration.metadata),
      ...this.repositoryRegistrations.map((registration) => registration.metadata),
      ...this.providerRegistrations.map((registration) => registration.metadata),
    ]
  }
}
