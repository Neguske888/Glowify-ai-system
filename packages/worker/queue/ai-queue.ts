// packages/worker/queue/ai-queue.ts
import { Queue, Worker } from 'bullmq';
import { redis } from '@/packages/database/redis'; // Assume a configured redis instance
import { processShopifyEvent } from '../handlers/event-handler';

export const aiQueue = new Queue('ai-processing', { connection: redis });

export const aiWorker = new Worker('ai-processing', async (job) => {
  await processShopifyEvent(job.data);
}, { connection: redis });
