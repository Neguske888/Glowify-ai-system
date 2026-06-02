import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { prisma } from '@/packages/database/client';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

export const executionWorker = new Worker('insight-execution', async (job) => {
  const { insightId, tenantId } = job.data;
  const startTime = Date.now();

  try {
    const insight = await prisma.aIInsight.findUnique({ where: { id: insightId } });
    if (!insight || insight.status === 'executed') return;

    await prisma.aIInsight.update({ where: { id: insightId }, data: { status: 'executed' } });
    
    await prisma.automationLog.create({
      data: { tenantId, action: 'DISTRIBUTED_EXECUTE', metadata: { insightId, duration: Date.now() - startTime, status: 'success', priority: job.opts.priority } }
    });
  } catch (err: any) {
    // Failure handling
    await prisma.automationLog.create({
      data: { tenantId, action: 'DISTRIBUTED_EXECUTE', metadata: { insightId, error: err.message, status: 'failed' } }
    });
    
    // DLQ Logic: Log to a dedicated table/DLQ if max attempts reached
    if (job.attemptsMade >= 3) {
      await prisma.automationLog.create({
        data: { tenantId, action: 'DEAD_LETTER_QUEUE', metadata: { insightId, reason: err.message, payload: job.data } }
      });
    }
    throw err;
  }
}, { connection });
