import { NextRequest, NextResponse } from 'next/server';
// Firebase Admin SDK should be used for server-side verification
import { getAuth } from 'firebase-admin/auth';
import { getApps, initializeApp, cert } from 'firebase-admin/app';

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)),
  });
}

// Middleware to protect routes and verify Firebase session
export async function middleware(req: NextRequest) {
  // 1. Get session token from headers (Authorization: Bearer <token>)
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return NextResponse.next();

  const token = authHeader.replace('Bearer ', '');

  try {
    // 2. Verify Firebase Auth token
    const decodedToken = await getAuth().verifyIdToken(token);
    
    // 3. Inject user context into headers if needed
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-uid', decodedToken.uid);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    // Token invalid or expired, proceed without user context
    return NextResponse.next();
  }
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
