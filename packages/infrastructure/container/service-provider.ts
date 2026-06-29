import type { ServiceProvider, ServiceToken } from './types'
import { InMemoryServiceCollection } from './service-collection'

export class DefaultServiceProvider implements ServiceProvider {
  constructor(
    protected readonly collection: InMemoryServiceCollection,
    protected readonly singletonCache: Map<ServiceToken, unknown> = new Map(),
    protected readonly scopedCache: Map<ServiceToken, unknown> = new Map(),
  ) {}

  resolve<T>(token: ServiceToken<T>): T {
    const descriptor = this.collection.get(token)
    if (!descriptor) {
      throw new Error(`No service registered for token: ${String(token)}`)
    }

    if (descriptor.lifetime === 'singleton') {
      if (!this.singletonCache.has(token)) {
        this.singletonCache.set(token, descriptor.factory(this))
      }
      return this.singletonCache.get(token) as T
    }

    if (descriptor.lifetime === 'scoped') {
      if (!this.scopedCache.has(token)) {
        this.scopedCache.set(token, descriptor.factory(this))
      }
      return this.scopedCache.get(token) as T
    }

    return descriptor.factory(this)
  }

  tryResolve<T>(token: ServiceToken<T>): T | undefined {
    try {
      return this.resolve(token)
    } catch {
      return undefined
    }
  }

  resolveLazy<T>(token: ServiceToken<T>): () => T {
    return () => this.resolve(token)
  }

  createScope(): ServiceProvider {
    return new DefaultServiceProvider(this.collection, this.singletonCache, new Map())
  }

  has<T>(token: ServiceToken<T>): boolean {
    return this.collection.has(token)
  }
}
