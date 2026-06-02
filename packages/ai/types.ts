import { z } from 'zod';

export const InsightStatus = z.enum(['pending', 'approved', 'executed', 'dismissed']);
export const Priority = z.enum(['low', 'medium', 'high', 'critical']);

export const InsightSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  priority: Priority,
  title: z.string(),
  description: z.string(),
  impact_estimate: z.number().nullable(), // Revenue impact
  recommendation: z.string(),
  automation_action: z.string(),
  status: InsightStatus.default('pending'),
  created_at: z.date().default(new Date()),
});

export type AIInsight = z.infer<typeof InsightSchema>;
