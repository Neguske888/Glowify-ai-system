import { prisma } from '../../database/client';
import { runAIEvaluation } from '../services/evaluator';

/**
 * Background job to process pending outcome evaluations.
 */
export async function processPendingEvaluations() {
  const pendingTraces = await prisma.executionTrace.findMany({
    where: {
      evaluationStatus: 'pending',
      timestamp: {
        lt: new Date(Date.now() - 60 * 60 * 1000) // At least 1 hour old
      }
    },
    take: 50
  });

  console.log(`Processing ${pendingTraces.length} pending evaluations...`);

  for (const trace of pendingTraces) {
    try {
      await runAIEvaluation(trace.id);
      console.log(`Evaluated trace ${trace.id}`);
    } catch (error: any) {
      console.error(`Failed to evaluate trace ${trace.id}:`, error.message);
    }
  }
}

/**
 * Scheduled job to evaluate outcomes after 24h/7d delays.
 */
export async function evaluateDelayedOutcomes() {
  const now = new Date();
  
  // 24h check
  const traces24h = await prisma.executionTrace.findMany({
    where: {
      evaluationStatus: 'pending',
      timestamp: { lt: new Date(now.getTime() - 24 * 60 * 60 * 1000) }
    }
  });

  // 7d check
  const traces7d = await prisma.executionTrace.findMany({
    where: {
      evaluationStatus: 'pending',
      timestamp: { lt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) }
    }
  });

  console.log(`Evaluating ${traces24h.length} 24h-pending and ${traces7d.length} 7d-pending traces.`);
  // Logic to trigger re-evaluation would go here...
}
