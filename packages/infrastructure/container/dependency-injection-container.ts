import type {
  DependencyInjectionContainer,
  ServiceDescriptor,
  ServiceFactory,
  ServiceProvider,
  ServiceToken,
} from './types'
import { InMemoryServiceCollection } from './service-collection'
import { DefaultServiceProvider } from './service-provider'

export class DefaultDependencyInjectionContainer
  extends DefaultServiceProvider
  implements DependencyInjectionContainer
{
  constructor(private readonly registry = new InMemoryServiceCollection()) {
    super(registry)
  }

  register<T>(descriptor: ServiceDescriptor<T>): this {
    this.registry.register(descriptor)
    return this
  }

  addInstance<T>(token: ServiceToken<T>, value: T): this {
    this.registry.addInstance(token, value)
    return this
  }

  addSingleton<T>(token: ServiceToken<T>, factory: ServiceFactory<T>): this {
    this.registry.addSingleton(token, factory)
    return this
  }

  addScoped<T>(token: ServiceToken<T>, factory: ServiceFactory<T>): this {
    this.registry.addScoped(token, factory)
    return this
  }

  addTransient<T>(token: ServiceToken<T>, factory: ServiceFactory<T>): this {
    this.registry.addTransient(token, factory)
    return this
  }

  addFactory<T>(token: ServiceToken<T>, factory: ServiceFactory<T>, lifetime = 'transient'): this {
    this.registry.addFactory(token, factory, lifetime)
    return this
  }

  get<T>(token: ServiceToken<T>): ServiceDescriptor<T> | undefined {
    return this.registry.get(token)
  }

  entries(): ReadonlyArray<ServiceDescriptor> {
    return this.registry.entries()
  }

  build(): ServiceProvider {
    return this
  }
}
