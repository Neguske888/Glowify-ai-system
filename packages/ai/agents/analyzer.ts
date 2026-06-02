// packages/ai/agents/analyzer.ts
import { OpenAI } from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { rankActionsByPerformance, calculateActionEffectiveness } from '../scoring/performance';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const InsightResponse = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.number().int().min(1).max(5),
  impactEstimate: z.number(),
  recommendation: z.string(),
  expectedOutcome: z.object({
    target: z.number(),
    description: z.string()
  }),
  automationAction: z.object({
    type: z.string(),
    payload: z.record(z.any())
  })
});

export async function analyzeBusinessData(tenantId: string, data: any) {
  // Adaptive Learning Context
  const topActions = await rankActionsByPerformance(tenantId, 'campaign_launch');
  const effectiveness = await calculateActionEffectiveness(tenantId, 'campaign_launch');

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
      { 
        role: "system", 
        content: `You are an expert AI growth operator. Analyze the provided business data and identify growth opportunities.
        
        ADAPTIVE PERFORMANCE CONTEXT:
        Top Historical Actions: ${JSON.stringify(topActions, null, 2)}
        Strategy Effectiveness: ${JSON.stringify(effectiveness, null, 2)}
        
        Prioritize and adapt your recommendations based on high-performing historical strategies.` 
      },
      { role: "user", content: JSON.stringify(data) }
    ],
    response_format: zodResponseFormat(z.array(InsightResponse), "insights")
  });

  return completion.choices[0].message.parsed;
}
