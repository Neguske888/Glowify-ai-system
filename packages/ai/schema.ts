// packages/ai/schema.ts
import { z } from 'zod';

export const InsightSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  title: z.string(),
  description: z.string(),
  impactEstimate: z.number(), // Estimated revenue impact
  recommendation: z.string(),
  automationAction: z.string().optional(),
  status: z.enum(['pending', 'executed', 'dismissed']),
  createdAt: z.date(),
});

export type AIInsight = z.infer<typeof InsightSchema>;
