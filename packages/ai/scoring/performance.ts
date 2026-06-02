import { prisma } from '../../database/client';

export async function rankActionsByPerformance(tenantId: string, decisionType: string, limit: number = 10) {
  return await prisma.executionTrace.findMany({
    where: {
      tenantId,
      eventType: decisionType,
      attributedRevenue: { not: null },
      evaluationStatus: 'COMPLETED'
    },
    orderBy: {
      attributedRevenue: 'desc'
    },
    take: limit
  });
}

export async function calculateActionEffectiveness(tenantId: string, decisionType: string) {
  const traces = await prisma.executionTrace.findMany({
    where: {
      tenantId,
      eventType: decisionType,
      evaluationStatus: 'COMPLETED'
    }
  });

  if (traces.length === 0) return 0;

  const totalRevenue = traces.reduce((acc, t) => acc + Number(t.attributedRevenue || 0), 0);
  const successCount = traces.filter(t => (t.successScore || 0) > 0.5).length;
  
  return {
    averageRevenue: totalRevenue / traces.length,
    conversionRate: successCount / traces.length
  };
}
