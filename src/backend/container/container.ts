import type { InjectionToken, Registry } from './registry'

export class BackendContainer {
  constructor(private readonly registry: Registry) {}

  register<T>(token: InjectionToken<T>, value: T): void {
    this.registry.register(token, value)
  }

  resolve<T>(token: InjectionToken<T>): T {
    return this.registry.resolve(token)
  }

  has<T>(token: InjectionToken<T>): boolean {
    return this.registry.has(token)
  }

  remove<T>(token: InjectionToken<T>): boolean {
    return this.registry.remove(token)
  }

  clear(): void {
    this.registry.clear()
  }
}
