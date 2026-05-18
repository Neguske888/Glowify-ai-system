import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { prisma } from '@/packages/database/client';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

export const initialAnalysisWorker = new Worker('insight-execution', async (job) => {
  if (job.name !== 'initial-analysis') return;
  
  const { tenantId, storeId } = job.data;

  // Create immediate first-value experience insight
  await prisma.aIInsight.create({
    data: {
      tenantId,
      title: 'Quick Win: Product Bundling',
      description: 'Analysis of your store suggests a 15% revenue increase by bundling top-performing items.',
      impactEstimate: 1250.00,
      recommendation: 'Click Execute to automatically generate a bundle in Shopify.',
      status: 'pending',
      priority: 1,
    }
  });
}, { connection });
