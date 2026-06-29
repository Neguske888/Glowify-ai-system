export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error'

export interface LogEntry {
  level: LogLevel
  message: string
  context?: Record<string, unknown>
  timestamp: Date
}

export interface Logger {
  log(level: LogLevel, message: string, context?: Record<string, unknown>): void
  trace(message: string, context?: Record<string, unknown>): void
  debug(message: string, context?: Record<string, unknown>): void
  info(message: string, context?: Record<string, unknown>): void
  warn(message: string, context?: Record<string, unknown>): void
  error(message: string, context?: Record<string, unknown>): void
  entries(): ReadonlyArray<LogEntry>
}

export class NoopLogger implements Logger {
  log(): void {}
  trace(): void {}
  debug(): void {}
  info(): void {}
  warn(): void {}
  error(): void {}
  entries(): ReadonlyArray<LogEntry> {
    return []
  }
}

export class BufferLogger implements Logger {
  private readonly buffer: LogEntry[] = []

  log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    this.buffer.push({
      level,
      message,
      context,
      timestamp: new Date(),
    })
  }

  trace(message: string, context?: Record<string, unknown>): void {
    this.log('trace', message, context)
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.log('debug', message, context)
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log('info', message, context)
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log('warn', message, context)
  }

  error(message: string, context?: Record<string, unknown>): void {
    this.log('error', message, context)
  }

  entries(): ReadonlyArray<LogEntry> {
    return [...this.buffer]
  }
}
