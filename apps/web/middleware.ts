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
