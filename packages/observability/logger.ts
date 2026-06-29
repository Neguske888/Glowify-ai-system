import type { LogEntry, LogLevel, ObservabilityAttributes } from './types'

export interface Logger {
  log(level: LogLevel, message: string, attributes?: ObservabilityAttributes): void
  trace(message: string, attributes?: ObservabilityAttributes): void
  debug(message: string, attributes?: ObservabilityAttributes): void
  info(message: string, attributes?: ObservabilityAttributes): void
  warn(message: string, attributes?: ObservabilityAttributes): void
  error(message: string, attributes?: ObservabilityAttributes): void
  fatal(message: string, attributes?: ObservabilityAttributes): void
  entries(): ReadonlyArray<LogEntry>
}
