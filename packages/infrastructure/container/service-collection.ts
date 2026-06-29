import type { ServiceCollection, ServiceDescriptor, ServiceFactory, ServiceLifetime, ServiceToken } from './types'

export class InMemoryServiceCollection implements ServiceCollection {
  private readonly descriptors = new Map<ServiceToken, ServiceDescriptor>()

  register<T>(descriptor: ServiceDescriptor<T>): this {
    this.descriptors.set(descriptor.token, descriptor)
    return this
  }

  addInstance<T>(token: ServiceToken<T>, value: T): this {
    return this.register({
      token,
      lifetime: 'singleton',
      factory: () => value,
    })
  }

  addSingleton<T>(token: ServiceToken<T>, factory: ServiceFactory<T>): this {
    return this.register({
      token,
      lifetime: 'singleton',
      factory,
    })
  }

  addScoped<T>(token: ServiceToken<T>, factory: ServiceFactory<T>): this {
    return this.register({
      token,
      lifetime: 'scoped',
      factory,
    })
  }

  addTransient<T>(token: ServiceToken<T>, factory: ServiceFactory<T>): this {
    return this.register({
      token,
      lifetime: 'transient',
      factory,
    })
  }

  addFactory<T>(token: ServiceToken<T>, factory: ServiceFactory<T>, lifetime: ServiceLifetime = 'transient'): this {
    return this.register({
      token,
      lifetime,
      factory,
    })
  }

  get<T>(token: ServiceToken<T>): ServiceDescriptor<T> | undefined {
    return this.descriptors.get(token) as ServiceDescriptor<T> | undefined
  }

  has<T>(token: ServiceToken<T>): boolean {
    return this.descriptors.has(token)
  }

  entries(): ReadonlyArray<ServiceDescriptor> {
    return [...this.descriptors.values()]
  }
}
