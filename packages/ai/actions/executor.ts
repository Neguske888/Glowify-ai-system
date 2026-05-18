// packages/ai/actions/executor.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function executeAutomation(tenantId: string, action: { type: string, payload: any }) {
  switch (action.type) {
    case 'SEND_EMAIL':
      return await resend.emails.send({
        from: 'Glowify <hello@glowify.ai>',
        to: action.payload.email,
        subject: action.payload.subject,
        html: action.payload.content
      });
    case 'ADJUST_AD_BUDGET':
      // Call Meta Ads API
      console.log('Adjusting ads for', tenantId, action.payload);
      break;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
