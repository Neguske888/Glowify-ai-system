import { describe, expect, it, vi } from 'vitest';

// Mock Next.js and external dependencies
vi.mock('next/server', () => ({
  NextRequest: class { constructor(public url: string, public init: any) {} },
  NextResponse: {
    json: vi.fn((data, init) => ({ data, init })),
  },
}));

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(),
}));

import { authenticateRequest, enforceSafeMode } from '../middleware';
import { verifyShopifyWebhook } from '../src/app/api/webhooks/shopify/utils';

// Mock Prisma
vi.mock('@/packages/database/client', () => ({
  prisma: {
    aPIKey: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe('Runtime Integrity Test Suite', () => {
  describe('Middleware & Authentication', () => {
    it('blocks request without API key', async () => {
      const req = new Request('http://localhost/api/observability/events', {
        headers: {},
      });
      const auth = await authenticateRequest(req as any);
      expect(auth).toBeNull();
    });

    it('injects tenantId correctly when key is valid', async () => {
      // Setup mock
      const { prisma } = await import('@/packages/database/client');
      vi.mocked(prisma.aPIKey.findUnique).mockResolvedValue({
        tenantId: 'tenant-123',
        tenant: { safeMode: false },
      } as any);

      const req = new Request('http://localhost/api/observability/events', {
        headers: { 'x-api-key': 'valid-key' },
      });
      const auth = await authenticateRequest(req as any);
      expect(auth?.tenantId).toBe('tenant-123');
    });
  });

  describe('SAFE_MODE Enforcement', () => {
    it('blocks /execute path when SAFE_MODE is enabled', () => {
      expect(() => enforceSafeMode(true, '/api/execute/test')).toThrow('SAFE_MODE_BLOCK');
    });

    it('allows non-execute paths when SAFE_MODE is enabled', () => {
      expect(() => enforceSafeMode(true, '/api/recommendations')).not.toThrow();
    });
  });

  describe('Webhook Security', () => {
    it('rejects invalid Shopify signatures', async () => {
      const req = new Request('http://localhost/api/webhooks/shopify', {
        method: 'POST',
        headers: { 'x-shopify-hmac-sha256': 'invalid' },
        body: JSON.stringify({ id: '1' }),
      });
      const isValid = await verifyShopifyWebhook(req as any);
      expect(isValid).toBe(false);
    });
  });
});
