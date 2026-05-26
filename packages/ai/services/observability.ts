import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ─── LOG LEVELS ────────────────────────────────────────────
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal'
export type LogCategory =
  | 'ai.analysis'
  | 'ai.execution'
  | 'ai.evaluation'
  | 'ai.simulation'
  | 'queue.job'
  | 'webhook.shopify'
  | 'database.sync'
  | 'auth.firebase'
  | 'system.startup'
  | 'system.shutdown'

// ─── STRUCTURED LOG ENTRY ─────────────────────────────────
export interface LogEntry {
  timestamp:  string
  level:      LogLevel
  category:   LogCategory
  message:    string
  tenantId?:  string
  jobId?:     string
  traceId?:   string
  spanId?:    string
  duration?:  number
  metadata?:  Record<string, unknown>
  error?:     { message: string; stack?: string; code?: string }
}

// ─── PERFORMANCE SPAN ─────────────────────────────────────
export interface PerformanceSpan {
  traceId:   string
  spanId:    string
  name:      string
  startTime: number
  endTime?:  number
  duration?: number
  status:    'running' | 'completed' | 'failed'
  metadata?: Record<string, unknown>
}

// ─── EXECUTION METRIC ─────────────────────────────────────
export interface ExecutionMetric {
  tenantId:          string
  actionType:        string
  success:           boolean
  durationMs:        number
  revenueAttributed?: number
  errorMessage?:     string
  metadata?:         Record<string, unknown>
}

// ─── GLOWIFY LOGGER ───────────────────────────────────────
class GlowifyLogger {
  private readonly isDevelopment = process.env.NODE_ENV !== 'production'
  private readonly logBuffer:     LogEntry[] = []
  private readonly bufferSize:    number = 50
  private flushTimer:             NodeJS.Timeout | null = null

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15)
  }

  // ── Core log method ──────────────────────────────────────
  private log(level: LogLevel, category: LogCategory, message: string, meta?: Partial<LogEntry>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      ...meta,
    }

    // Console output — colored in dev, JSON in production
    if (this.isDevelopment) {
      const colors: Record<LogLevel, string> = {
        debug: '\x1b[36m',  // cyan
        info:  '\x1b[32m',  // green
        warn:  '\x1b[33m',  // yellow
        error: '\x1b[31m',  // red
        fatal: '\x1b[35m',  // magenta
      }
      const reset = '\x1b[0m'
      const color = colors[level] || reset
      const prefix = `${color}[${level.toUpperCase().padEnd(5)}]${reset}`
      const cat    = `\x1b[90m[${category}]${reset}`
      const tid    = meta?.tenantId ? `\x1b[90m(${meta.tenantId.slice(0,8)}...)${reset}` : ''
      console.log(`${prefix} ${cat} ${tid} ${message}`, meta?.metadata || '')
      if (meta?.error) console.error('  Error:', meta.error.message, meta.error.stack || '')
    } else {
      process.stdout.write(JSON.stringify(entry) + '\n')
    }

    // Buffer for async persistence
    this.logBuffer.push(entry)
    if (this.logBuffer.length >= this.bufferSize) {
      this.flush()
    } else if (!this.flushTimer) {
      this.flushTimer = setTimeout(() => this.flush(), 5000)
    }
  }

  // ── Public log methods ───────────────────────────────────
  debug(category: LogCategory, message: string, meta?: Partial<LogEntry>): void {
    if (this.isDevelopment) this.log('debug', category, message, meta)
  }

  info(category: LogCategory, message: string, meta?: Partial<LogEntry>): void {
    this.log('info', category, message, meta)
  }

  warn(category: LogCategory, message: string, meta?: Partial<LogEntry>): void {
    this.log('warn', category, message, meta)
  }

  error(category: LogCategory, message: string, error?: Error, meta?: Partial<LogEntry>): void {
    this.log('error', category, message, {
      ...meta,
      error: error ? { message: error.message, stack: error.stack, code: (error as any).code } : undefined,
    })
  }

  fatal(category: LogCategory, message: string, error?: Error, meta?: Partial<LogEntry>): void {
    this.log('fatal', category, message, {
      ...meta,
      error: error ? { message: error.message, stack: error.stack } : undefined,
    })
  }

  // ── Performance tracing ──────────────────────────────────
  startSpan(name: string, meta?: Record<string, unknown>): PerformanceSpan {
    const span: PerformanceSpan = {
      traceId:   this.generateId(),
      spanId:    this.generateId(),
      name,
      startTime: Date.now(),
      status:    'running',
      metadata:  meta,
    }
    this.debug('system.startup', `Span started: ${name}`, { traceId: span.traceId, spanId: span.spanId })
    return span
  }

  endSpan(span: PerformanceSpan, status: 'completed' | 'failed' = 'completed'): PerformanceSpan {
    span.endTime  = Date.now()
    span.duration = span.endTime - span.startTime
    span.status   = status
    const level   = status === 'failed' ? 'warn' : 'debug'
    this.log(level, 'system.startup', `Span ended: ${span.name} — ${span.duration}ms [${status}]`, {
      traceId: span.traceId,
      spanId:  span.spanId,
      duration: span.duration,
    })
    return span
  }

  // ── AI Action tracking ───────────────────────────────────
  async trackAIAction(metric: ExecutionMetric): Promise<void> {
    this.info('ai.execution', `AI Action: ${metric.actionType}`, {
      tenantId: metric.tenantId,
      duration: metric.durationMs,
      metadata: {
        success:           metric.success,
        revenueAttributed: metric.revenueAttributed,
        errorMessage:      metric.errorMessage,
      },
    })

    // Persist to Prisma ExecutionTrace
    try {
      await prisma.executionTrace.create({
        data: {
          tenantId:          metric.tenantId,
          actionType:        metric.actionType,
          status:            metric.success ? 'completed' : 'failed',
          durationMs:        metric.durationMs,
          revenueAttributed: metric.revenueAttributed || 0,
          errorMessage:      metric.errorMessage,
          metadata:          metric.metadata as any,
          createdAt:         new Date(),
        },
      }).catch(() => null) // graceful — don't crash if schema differs
    } catch (err: any) {
      this.warn('database.sync', `Could not persist execution trace: ${err.message}`)
    }
  }

  // ── Error alert ──────────────────────────────────────────
  alert(category: LogCategory, message: string, context: Record<string, unknown>): void {
    this.error(category, `ALERT: ${message}`, undefined, { metadata: context })
    // Future: send to Sentry, PagerDuty, Slack webhook here
    if (process.env.SLACK_ALERT_WEBHOOK) {
      fetch(process.env.SLACK_ALERT_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚨 *Glowify Alert* [${category}]\n${message}\n\`\`\`${JSON.stringify(context, null, 2)}\`\`\``,
        }),
      }).catch(() => null)
    }
  }

  // ── Flush buffer to storage ──────────────────────────────
  private async flush(): Promise<void> {
    if (this.flushTimer) { clearTimeout(this.flushTimer); this.flushTimer = null }
    const entries = this.logBuffer.splice(0)
    if (entries.length === 0) return
    // In production: send to your log aggregator (CloudWatch, Datadog, etc.)
    // For now: errors and fatals get persisted to DB
    const criticalEntries = entries.filter(e => e.level === 'error' || e.level === 'fatal')
    if (criticalEntries.length > 0) {
      try {
        for (const entry of criticalEntries) {
          await (prisma as any).systemLog?.create({ data: { ...entry } }).catch(() => null)
        }
      } catch { /* silent */ }
    }
  }

  async flushAll(): Promise<void> { await this.flush() }
}

// ─── SINGLETON EXPORT ─────────────────────────────────────
export const logger = new GlowifyLogger()

// ─── DECORATOR HELPER ─────────────────────────────────────
export function withObservability<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  spanName: string,
  category: LogCategory,
  tenantId?: string
): T {
  return (async (...args: any[]) => {
    const span = logger.startSpan(spanName, { tenantId })
    try {
      const result = await fn(...args)
      logger.endSpan(span, 'completed')
      return result
    } catch (err: any) {
      logger.endSpan(span, 'failed')
      logger.error(category, `${spanName} failed`, err, { tenantId, traceId: span.traceId })
      throw err
    }
  }) as T
}

// ─── PROCESS-LEVEL ERROR HANDLERS ─────────────────────────
process.on('uncaughtException', (err) => {
  logger.fatal('system.startup', 'Uncaught exception', err)
  process.exit(1)
})

process.on('unhandledRejection', (reason: any) => {
  logger.fatal('system.startup', 'Unhandled rejection', reason instanceof Error ? reason : new Error(String(reason)))
})

process.on('beforeExit', async () => {
  await logger.flushAll()
})
