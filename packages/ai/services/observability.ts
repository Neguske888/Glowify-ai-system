import { prisma } from '../../database/client';

export async function logEvent(tenantId: string, eventType: string, payload: any, status: string, relatedId?: string) {
  return await prisma.eventLog.create({
    data: {
      tenantId,
      eventType,
      payload,
      status,
      relatedId,
    },
  });
}

export async function logAIDecision(tenantId: string, eventType: string, payload: any, status: string, relatedId?: string) {
  return await prisma.aITrace.create({
    data: {
      tenantId,
      eventType,
      payload,
      status,
      relatedId,
    },
  });
}

export async function logExecution(tenantId: string, eventType: string, payload: any, status: string, relatedId?: string) {
  return await prisma.executionTrace.create({
    data: {
      tenantId,
      eventType,
      payload,
      status,
      relatedId,
    },
  });
}
