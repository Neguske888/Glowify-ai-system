import { prisma } from '@/packages/database/client';

export const PLAN_LIMITS = {
  free: { maxActions: 10, name: 'Free' },
  starter: { maxActions: 100, name: 'Starter' },
  growth: { maxActions: 500, name: 'Growth' },
  pro: { maxActions: Infinity, name: 'Pro' },
};

export async function validateSubscription(tenantId: string) {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { planType: true },
  });

  if (!tenant || !tenant.planType) return { allowed: false, plan: 'none' };
  
  // In production, check Stripe subscription status here
  return { allowed: true, plan: tenant.planType };
}
