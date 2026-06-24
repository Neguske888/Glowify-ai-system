import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = !getApps().length 
  ? initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)) }) 
  : getApps()[0];
const db = getFirestore(app);

export async function POST(req: Request) {
  const hmac = req.headers.get('x-shopify-hmac-sha256');
  const body = await req.text();
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET!;

  const digest = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('base64');

  if (digest !== hmac) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = JSON.parse(body);
  const shopDomain = req.headers.get('x-shopify-shop-domain');

  if (!shopDomain) {
    return NextResponse.json({ error: 'Missing shop domain header' }, { status: 400 });
  }

  // Lookup store UUID
  const storesRef = db.collection('stores');
  const querySnapshot = await storesRef.where('shopify_domain', '==', shopDomain).get();

  if (querySnapshot.empty) {
    console.error(`Store not found for domain: ${shopDomain}`);
    return NextResponse.json({ error: 'Store not found' }, { status: 404 });
  }

  const storeId = querySnapshot.docs[0].id;

  // Log event
  await db.collection('automation_logs').add({
    store_id: storeId,
    event_type: 'order_created',
    details: data,
    created_at: new Date().toISOString()
  });

  // Store order
  await db.collection('orders').add({
    store_id: storeId,
    shopify_order_id: data.id,
    total_price: data.total_price,
    currency: data.currency,
    created_at: new Date().toISOString()
  });

  return NextResponse.json({ received: true });
}
