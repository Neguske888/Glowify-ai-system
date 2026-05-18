// packages/ai/jobs/stress-tester.ts
import { prisma } from '../../database/client';
import { insightQueue } from '../queues/insightQueue';

/**
 * Simulates high-volume, concurrent Shopify webhook traffic with failure injection.
 */
export async function runStressTest(tenantIds: string[], batchSize: number = 100) {
  console.log(`Starting stress test for ${tenantIds.length} tenants with ${batchSize} events each.`);

  const testResults = {
    processed: 0,
    failed: 0,
    injectedFailures: 0
  };

  // Simulate concurrent processing across tenants
  await Promise.all(tenantIds.map(async (tenantId) => {
    for (let i = 0; i < batchSize; i++) {
      try {
        // Failure Injection: Duplicate events
        const isDuplicate = i % 20 === 0;
        
        // Failure Injection: Missing payload fields (simulated by empty object)
        const isMalformed = i % 50 === 0;
        
        const payload = isMalformed ? {} : { 
          id: `stress_order_${i}`, 
          financial_status: 'paid',
          timestamp: new Date().toISOString()
        };

        // Failure Injection: Delayed execution
        const delay = (i % 10 === 0) ? 5000 : 0;

        await new Promise(resolve => setTimeout(resolve, delay));
        
        await insightQueue.add('process-event', {
          tenantId,
          eventData: payload,
          orderId: payload.id,
          orderStatus: payload.financial_status
        });

        testResults.processed++;
      } catch (err) {
        testResults.failed++;
      }
    }
  }));

  console.log("Stress test complete:", testResults);
  return testResults;
}
