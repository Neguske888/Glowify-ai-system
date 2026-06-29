export type Constructor<T> = abstract new (...args: any[]) => T

export type ServiceToken<T = unknown> = string | symbol | Constructor<T>

export type ServiceFactory<T> = (provider: ServiceProvider) => T

export type ServiceLifetime = 'singleton' | 'scoped' | 'transient'

export interface ServiceDescriptor<T = unknown> {
  token: ServiceToken<T>
  lifetime: ServiceLifetime
  factory: ServiceFactory<T>
}

export interface ServiceProvider {
  resolve<T>(token: ServiceToken<T>): T
  tryResolve<T>(token: ServiceToken<T>): T | undefined
  resolveLazy<T>(token: ServiceToken<T>): () => T
  createScope(): ServiceProvider
  has<T>(token: ServiceToken<T>): boolean
}

export interface ServiceCollection {
  register<T>(descriptor: ServiceDescriptor<T>): this
  addInstance<T>(token: ServiceToken<T>, value: T): this
  addSingleton<T>(token: ServiceToken<T>, factory: ServiceFactory<T>): this
  addScoped<T>(token: ServiceToken<T>, factory: ServiceFactory<T>): this
  addTransient<T>(token: ServiceToken<T>, factory: ServiceFactory<T>): this
  addFactory<T>(token: ServiceToken<T>, factory: ServiceFactory<T>, lifetime?: ServiceLifetime): this
  get<T>(token: ServiceToken<T>): ServiceDescriptor<T> | undefined
  has<T>(token: ServiceToken<T>): boolean
  entries(): ReadonlyArray<ServiceDescriptor>
}

export interface DependencyInjectionContainer extends ServiceCollection, ServiceProvider {
  build(): ServiceProvider
}
