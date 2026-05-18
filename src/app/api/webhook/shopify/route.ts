import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

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
  const storeId = req.headers.get('x-shopify-shop-domain');

  // Log event
  await supabase.from('automation_logs').insert({
    store_id: storeId,
    event_type: 'order_created',
    details: data
  });

  // Store order
  await supabase.from('orders').insert({
    store_id: storeId,
    shopify_order_id: data.id,
    total_price: data.total_price,
    currency: data.currency
  });

  return NextResponse.json({ received: true });
}
