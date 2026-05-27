import { Worker, WorkerOptions } from 'bullmq'
import { connection, CONCURRENCY_CONFIG } from './queue/ai-queue'

export function createWorker(
  queueName: string,
  processor: string, // Adjusted from original to reflect processor function or path
  configKey: keyof typeof CONCURRENCY_CONFIG,
  options: Partial<WorkerOptions> = {}
): Worker {
  const config = CONCURRENCY_CONFIG[configKey]
  // Using 'any' for the processor since the original spec expected a path/name, 
  // but standard bullmq processor is a function or string path. 
  // Assuming the user will provide a function or path correctly.
  const worker = new Worker(queueName, processor as any, {
    connection,
    concurrency: config.concurrency,
    limiter:     config.limiter,
    settings: {
      stalledInterval:    30000, // check stalled jobs every 30s
      maxStalledCount:    2,     // max times a job can stall before failing
    },
    ...options,
  })

  worker.on('completed', (job) => {
    console.log(`Worker [${queueName}]: job ${job.id} completed ✓`)
  })

  worker.on('failed', (job, err) => {
    console.error(`Worker [${queueName}]: job ${job?.id} failed —`, err.message)
    if (job && job.attemptsMade >= (job.opts.attempts || 3)) {
      console.error(`Worker [${queueName}]: job ${job.id} exhausted all retries`)
    }
  })

  worker.on('stalled', (jobId) => {
    console.warn(`Worker [${queueName}]: job ${jobId} stalled`)
  })

  worker.on('error', (err) => {
    console.error(`Worker [${queueName}]: worker error —`, err.message)
  })

  console.log(`Worker [${queueName}]: started with concurrency ${config.concurrency} ✓`)
  return worker
}
