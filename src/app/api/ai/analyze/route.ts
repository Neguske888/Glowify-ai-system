import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const app = !getApps().length 
  ? initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)) }) 
  : getApps()[0];
const db = getFirestore(app);

export async function POST(req: Request) {
  const { storeId } = await req.json();

  // Fetch recent data for context
  const ordersQuery = await db.collection('orders')
    .where('store_id', '==', storeId)
    .limit(50)
    .get();
  
  const orders = ordersQuery.docs.map(doc => doc.data());

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are an eCommerce growth expert. Return analysis as a JSON array of objects: { "title": string, "impact": number (1-10), "description": string }' },
      { role: 'user', content: `Analyze this store performance: ${JSON.stringify(orders)}` }
    ],
    response_format: { type: 'json_object' }
  });

  const insights = JSON.parse(completion.choices[0].message.content!);

  // Store insights
  for (const insight of insights.suggestions) {
    await db.collection('ai_decisions').add({
      store_id: storeId,
      action_type: 'optimization',
      impact_score: insight.impact,
      suggestion: insight,
      created_at: new Date().toISOString()
    });
  }

  return NextResponse.json({ insights });
}
