import { prisma } from '@/packages/database/client';

export const AI_COST_ESTIMATES = {
  AD_CAMPAIGN: 0.05,
  EMAIL_SEND: 0.02,
  SHOPIFY_UPDATE: 0.01,
};

export async function checkBudget(tenantId: string, estimatedCost: number) {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    include: { automationLogs: true } // Simplified: used to aggregate current spend
  });

  if (!tenant) return false;

  // In production: perform actual aggregate spend calculation
  const currentMonthlySpend = 50.0; // Placeholder for aggregate query
  const limit = tenant.planType === 'free' ? 100 : 1000;

  return (currentMonthlySpend + estimatedCost) <= limit;
}

export function classifyRisk(cost: number) {
  if (cost > 0.04) return 'HIGH';
  if (cost > 0.02) return 'MEDIUM';
  return 'LOW';
}
