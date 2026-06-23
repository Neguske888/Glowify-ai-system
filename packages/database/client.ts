import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';

export const prisma = new PrismaClient();

// Database client wrapper to enforce tenant context
export async function getTenantPrisma() {
  const tenantId = headers().get('x-tenant-id');

  if (!tenantId) {
    throw new Error('Tenant context missing');
  }

  // Set the tenant session variable for the current connection using a parameterized query to prevent SQL injection
  await prisma.$executeRaw`SET app.current_tenant_id = ${tenantId}`;

  return prisma;
}
