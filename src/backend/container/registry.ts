export interface InjectionToken<T> {
  readonly key: symbol
  readonly description: string
  readonly __type?: T
}

export function createInjectionToken<T>(description: string): InjectionToken<T> {
  return {
    key: Symbol(description),
    description,
  }
}

export class Registry {
  private readonly entries = new Map<symbol, unknown>()

  register<T>(token: InjectionToken<T>, value: T): void {
    this.entries.set(token.key, value)
  }

  resolve<T>(token: InjectionToken<T>): T {
    if (!this.entries.has(token.key)) {
      throw new Error(`MISSING_REGISTRATION:${token.description}`)
    }

    return this.entries.get(token.key) as T
  }

  has<T>(token: InjectionToken<T>): boolean {
    return this.entries.has(token.key)
  }

  remove<T>(token: InjectionToken<T>): boolean {
    return this.entries.delete(token.key)
  }

  clear(): void {
    this.entries.clear()
  }
}
