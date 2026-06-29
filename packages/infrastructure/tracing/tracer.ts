export interface TraceSpan {
  readonly name: string
  setAttribute(key: string, value: string | number | boolean): this
  recordException(error: unknown): this
  end(): void
}

export interface Tracer {
  startSpan(name: string, attributes?: Record<string, string | number | boolean>): TraceSpan
}

class InMemoryTraceSpan implements TraceSpan {
  private readonly attributes = new Map<string, string | number | boolean>()

  constructor(public readonly name: string, attributes?: Record<string, string | number | boolean>) {
    for (const [key, value] of Object.entries(attributes ?? {})) {
      this.attributes.set(key, value)
    }
  }

  setAttribute(key: string, value: string | number | boolean): this {
    this.attributes.set(key, value)
    return this
  }

  recordException(): this {
    return this
  }

  end(): void {}
}

export class NoopTracer implements Tracer {
  startSpan(name: string, attributes?: Record<string, string | number | boolean>): TraceSpan {
    return new InMemoryTraceSpan(name, attributes)
  }
}
