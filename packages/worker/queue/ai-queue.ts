import { Queue, Worker, QueueEvents, FlowProducer, WorkerOptions, QueueOptions } from 'bullmq'
import IORedis from 'ioredis'

// ─── REDIS CONNECTION ──────────────────────────────────────
const redisConfig = {
  host:              process.env.REDIS_HOST     || 'localhost',
  port:              parseInt(process.env.REDIS_PORT || '6379'),
  password:          process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,            // required by BullMQ
  enableReadyCheck:  false,              // required by BullMQ
  lazyConnect:       true,
  retryStrategy: (times: number) => {
    if (times > 10) {
      console.error('Redis: max retries reached — giving up')
      return null
    }
    const delay = Math.min(times * 200, 3000)
    console.log(`Redis: retry attempt ${times} in ${delay}ms`)
    return delay
  },
}

const connection = new IORedis(redisConfig)

connection.on('connect',      () => console.log('Glowify Queue: Redis connected ✓'))
connection.on('error',   (err) => console.error('Glowify Queue: Redis error —', err.message))
connection.on('reconnecting', () => console.log('Glowify Queue: Redis reconnecting...'))

// ─── CONCURRENCY CONFIGURATION ────────────────────────────
export const CONCURRENCY_CONFIG = {
  // AI Analysis jobs — expensive LLM calls, low concurrency
  AI_ANALYSIS: {
    concurrency: parseInt(process.env.CONCURRENCY_AI_ANALYSIS || '3'),
    limiter: {
      max:      parseInt(process.env.RATE_LIMIT_AI_ANALYSIS_MAX  || '10'),
      duration: parseInt(process.env.RATE_LIMIT_AI_ANALYSIS_DURATION || '60000'), // 10 per minute
    },
  },
  // Execution jobs — API calls, moderate concurrency
  AI_EXECUTION: {
    concurrency: parseInt(process.env.CONCURRENCY_AI_EXECUTION || '5'),
    limiter: {
      max:      parseInt(process.env.RATE_LIMIT_AI_EXECUTION_MAX      || '30'),
      duration: parseInt(process.env.RATE_LIMIT_AI_EXECUTION_DURATION || '60000'), // 30 per minute
    },
  },
  // Evaluation jobs — DB reads, higher concurrency OK
  AI_EVALUATION: {
    concurrency: parseInt(process.env.CONCURRENCY_AI_EVALUATION || '8'),
    limiter: {
      max:      parseInt(process.env.RATE_LIMIT_AI_EVALUATION_MAX      || '60'),
      duration: parseInt(process.env.RATE_LIMIT_AI_EVALUATION_DURATION || '60000'),
    },
  },
  // Shopify webhook processing — high throughput needed
  SHOPIFY_WEBHOOK: {
    concurrency: parseInt(process.env.CONCURRENCY_SHOPIFY_WEBHOOK || '10'),
    limiter: {
      max:      parseInt(process.env.RATE_LIMIT_SHOPIFY_MAX      || '100'),
      duration: parseInt(process.env.RATE_LIMIT_SHOPIFY_DURATION || '60000'),
    },
  },
  // Simulation jobs — can be slow, low priority
  AI_SIMULATION: {
    concurrency: parseInt(process.env.CONCURRENCY_AI_SIMULATION || '2'),
    limiter: {
      max:      parseInt(process.env.RATE_LIMIT_AI_SIMULATION_MAX      || '5'),
      duration: parseInt(process.env.RATE_LIMIT_AI_SIMULATION_DURATION || '60000'),
    },
  },
}

// ─── DEFAULT JOB OPTIONS ──────────────────────────────────
const DEFAULT_JOB_OPTIONS = {
  attempts: 3,
  backoff: {
    type: 'exponential' as const,
    delay: 2000,
  },
  removeOnComplete: {
    count: 100,
    age:   3600 * 24 * 7, // keep 7 days
  },
  removeOnFail: {
    count: 500,
    age:   3600 * 24 * 30, // keep 30 days for debugging
  },
}

// ─── QUEUE DEFINITIONS ────────────────────────────────────
const queueOptions: QueueOptions = {
  connection,
  defaultJobOptions: DEFAULT_JOB_OPTIONS,
}

export const queues = {
  aiAnalysis:      new Queue('ai-analysis',      queueOptions),
  aiExecution:     new Queue('ai-execution',     queueOptions),
  aiEvaluation:    new Queue('ai-evaluation',    queueOptions),
  shopifyWebhook:  new Queue('shopify-webhook',  queueOptions),
  aiSimulation:    new Queue('ai-simulation',    { ...queueOptions, defaultJobOptions: { ...DEFAULT_JOB_OPTIONS, priority: 10 } }),
}

// ─── JOB TYPE DEFINITIONS ─────────────────────────────────
export type AIAnalysisJobData = {
  tenantId:   string
  shopId:     string
  triggeredBy: 'webhook' | 'schedule' | 'manual'
  context?:   Record<string, unknown>
}

export type AIExecutionJobData = {
  tenantId:    string
  insightId:   string
  actionType:  string
  parameters:  Record<string, unknown>
}

export type AIEvaluationJobData = {
  tenantId:     string
  executionId:  string
  lookbackDays: number
}

export type ShopifyWebhookJobData = {
  topic:   string
  shopId:  string
  payload: Record<string, unknown>
}

export type AISimulationJobData = {
  tenantId:  string
  scenario:  string
  parameters: Record<string, unknown>
}

// ─── JOB PRODUCERS ────────────────────────────────────────
export const jobProducers = {

  enqueueAIAnalysis: (data: AIAnalysisJobData, options?: object) =>
    queues.aiAnalysis.add('analyze', data, {
      ...DEFAULT_JOB_OPTIONS,
      priority: data.triggeredBy === 'webhook' ? 1 : 5,
      ...options,
    }),

  enqueueAIExecution: (data: AIExecutionJobData, options?: object) =>
    queues.aiExecution.add('execute', data, { ...DEFAULT_JOB_OPTIONS, ...options }),

  enqueueAIEvaluation: (data: AIEvaluationJobData, delay?: number) =>
    queues.aiEvaluation.add('evaluate', data, {
      ...DEFAULT_JOB_OPTIONS,
      delay: delay ?? 1000 * 60 * 60 * 24, // default: 24h after execution
    }),

  enqueueShopifyWebhook: (data: ShopifyWebhookJobData) =>
    queues.shopifyWebhook.add(`webhook-${data.topic}`, data, {
      ...DEFAULT_JOB_OPTIONS,
      attempts: 5, // webhooks are critical
    }),

  enqueueSimulation: (data: AISimulationJobData) =>
    queues.aiSimulation.add('simulate', data, {
      ...DEFAULT_JOB_OPTIONS,
      attempts: 1, // simulations fail fast
    }),
}

// ─── QUEUE HEALTH MONITORING ──────────────────────────────
export async function getQueueHealth(): Promise<Record<string, object>> {
  const health: Record<string, object> = {}
  for (const [name, queue] of Object.entries(queues)) {
    try {
      const [waiting, active, completed, failed, delayed] = await Promise.all([
        queue.getWaitingCount(),
        queue.getActiveCount(),
        queue.getCompletedCount(),
        queue.getFailedCount(),
        queue.getDelayedCount(),
      ])
      health[name] = { waiting, active, completed, failed, delayed }
    } catch (err: any) {
      health[name] = { error: err.message }
    }
  }
  return health
}

// ─── GRACEFUL SHUTDOWN ────────────────────────────────────
export async function gracefulShutdown(): Promise<void> {
  console.log('Glowify Queue: initiating graceful shutdown...')
  await Promise.allSettled(Object.values(queues).map(q => q.close()))
  await connection.quit()
  console.log('Glowify Queue: all queues closed ✓')
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT',  gracefulShutdown)

export { connection }
