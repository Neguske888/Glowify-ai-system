import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

export async function POST(req: Request) {
  const { storeId } = await req.json();

  // Fetch recent data for context
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('store_id', storeId)
    .limit(50);

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
    await supabase.from('ai_decisions').insert({
      store_id: storeId,
      action_type: 'optimization',
      impact_score: insight.impact,
      suggestion: insight
    });
  }

  return NextResponse.json({ insights });
}
