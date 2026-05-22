import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Middleware to inject tenant context into PostgreSQL
export async function middleware(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Get session from request
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return NextResponse.next();

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) return NextResponse.next();

  // 2. Extract tenant_id from user metadata (injected during sign up)
  const tenantId = user.user_metadata.tenant_id;

  if (tenantId) {
    // 3. Inject into request headers for downstream database clients to pick up
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-tenant-id', tenantId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

/**
 * Authenticates an incoming request using the API key in the headers.
 */
export async function authenticateRequest(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key');
  if (!apiKey) return null;

  try {
    const { prisma } = await import('../../packages/database/client');
    const apiKeyDoc = await (prisma as any).aPIKey.findUnique({
      where: { key: apiKey },
      include: { tenant: true },
    });
    return apiKeyDoc;
  } catch (error) {
    console.error('Error authenticating request via API key:', error);
    return null;
  }
}

/**
 * Enforces Safe Mode restrictions by blocking certain paths.
 */
export function enforceSafeMode(safeMode: boolean, path: string) {
  if (safeMode && (path.startsWith('/api/execute') || path.includes('/execute'))) {
    throw new Error('SAFE_MODE_BLOCK');
  }
}

