import { db } from '../lib/firebase-admin';

const STORE_ID = 'neurozen_lab';

const PRODUCTS = ['Glow Serum', 'Vitamin C Oil', 'Hydration Mask', 'Repair Cream'];

const randomDelay = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min) * 1000;

async function chaosSimulator() {
  console.log('--- Chaos Simulator Running ---');

  while (true) {
    const eventType = Math.random();

    try {
      if (eventType < 0.33) {
        // 1. Inject Shopify Webhook
        const amount = Math.floor(Math.random() * 200) + 20;
        await db.collection('stores').doc(STORE_ID).collection('webhooks_queue').add({
          topic: 'orders/create',
          amount,
          occurredAt: new Date().toISOString(),
        });
        console.log(`[Webhook] Order created: $${amount}`);
      } else if (eventType < 0.66) {
        // 2. Inventory Alert
        const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
        const productRef = db.collection('stores').doc(STORE_ID).collection('products').where('title', '==', product);
        const snapshot = await productRef.get();

        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          await doc.ref.update({ stockLevel: Math.floor(Math.random() * 4) + 1 });
          console.log(`[Inventory] Alert: ${product} stock dropped.`);
        }
      } else {
        // 3. Agent Intervention
        const agents = ['Inventory-Sentinel', 'Pricing-Optimizer', 'Conversion-Bot'];
        const agent = agents[Math.floor(Math.random() * agents.length)];
        await db.collection('stores').doc(STORE_ID).collection('agent_telemetry').add({
          agent,
          impactScore: Math.random() * 10,
          reasoning: `Detected anomaly in ${PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)]} metrics.`,
          action: `Automatically adjusted parameters to stabilize flow.`,
          timestamp: new Date().toISOString(),
        });
        console.log(`[Agent] ${agent} intervened.`);
      }
    } catch (e) {
      console.error('Chaos injection failed:', e);
    }

    await new Promise(resolve => setTimeout(resolve, randomDelay(4, 7)));
  }
}

chaosSimulator().catch(console.error);
