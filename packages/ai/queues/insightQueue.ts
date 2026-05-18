// packages/ai/queues/insightQueue.ts
import { Queue, Worker } from 'bullmq';
import { analyzeBusinessData } from '../agents/analyzer';
import { executeAutomation } from '../actions/executor';
import { logAIDecision, logExecution } from '../services/observability';
import { prisma } from '../../database/client';

export const insightQueue = new Queue('insight-generation', {
  connection: { host: 'localhost', port: 6379 }
});

export const worker = new Worker('insight-generation', async job => {
  const { tenantId, eventData } = job.data;

  // 1. AI Analysis with learning context
  const insights = await analyzeBusinessData(tenantId, eventData);
  await logAIDecision(tenantId, 'AI_INSIGHT_GENERATED', insights, 'SUCCESS', job.id?.toString());

  // 2. Persist & Trigger Actions
  for (const insight of insights) {
    try {
      const result = await executeAutomation(tenantId, insight.automationAction);
      // Log execution WITH expected outcome for the feedback loop
      await prisma.executionTrace.create({
        data: {
          tenantId,
          eventType: insight.automationAction.type,
          payload: { action: insight.automationAction, result },
          status: 'SUCCESS',
          relatedId: job.id?.toString(),
          expectedOutcome: insight.expectedOutcome,
          evaluationStatus: 'pending'
        }
      });
    } catch (error: any) {
      await logExecution(tenantId, insight.automationAction.type, { error: error.message }, 'FAILED', job.id?.toString());
    }
  }
}, { connection: { host: 'localhost', port: 6379 } });

