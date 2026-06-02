import { getTenantPrisma } from '@/packages/database/client';

export async function getInsights() {
  const prisma = await getTenantPrisma();
  return await prisma.aIInsight.findMany({
    orderBy: { priority: 'asc' },
    where: { status: 'pending' }
  });
}

export async function executeInsightAction(insightId: string) {
  const prisma = await getTenantPrisma();
  return await prisma.aIInsight.update({
    where: { id: insightId },
    data: { status: 'executed' }
  });
}
