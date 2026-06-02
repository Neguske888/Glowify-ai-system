import { prisma } from '@/packages/database/client';

export type Plan = 'free' | 'starter' | 'growth' | 'pro';

export const PLAN_LIMITS: Record<Plan, number> = {
  free: 10,
  starter: 100,
  growth: 1000,
  pro: 5000,
};

export async function validateSubscription(tenantId: string) {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
  });

  if (!tenant || tenant.planType === 'expired') {
    return { valid: false, reason: 'Subscription inactive' };
  }

  return { valid: true, plan: tenant.planType as Plan };
}
