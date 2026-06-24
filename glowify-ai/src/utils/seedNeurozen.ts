import admin from 'firebase-admin';
import { 
  NEUROZEN_PRODUCTS, 
  SHOPIFY_WEBHOOKS, 
  AGENT_FLEET_LOGS 
} from './neurozenMockData';

/**
 * NEUROZEN LAB - Firestore Seeder
 * Populates Firestore with enterprise-grade mock data for functional supplements.
 */

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY 
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      : {
          projectId: "glowify-ai-system",
          clientEmail: "firebase-adminsdk-fbsvc@glowify-ai-system.iam.gserviceaccount.com",
          privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpO3cV1x0TxLIF\nNua9Tl2kwdq4ReXaYCbpeyACqEqvNSTD7sUPGyBVUox/s+K5X03fdfzvWRQQpdyD\nOG50JcGEuj9+TaEr4bWUlO6CWJ07azMbP9zjlNzjfhW5aQuTQ5oXykcz1AvCnaG9\nFvfpCFR4NgTARXZnl5vzHvv++2NxOyldeBs5ciYn/IEUQ6cPOQnSWNgPTerW/Oju\neKzmSGVy1D886uCw8/lEYgZdJm5SPOTJLczoubs+SIwtU8PQaSWP7rpCxCYt4Y5E\nVeCCaP2RncsTcpN3dzpYvk/A+jWsIyG5w2K5AdZKJViSzHZSsGv8kcgRB2INERQS\nL/435GRtAgMBAAECggEAB/v6PlmL0abyDzTr5fqQiHls7Ey/73Gh5FoexIFUJLgJ\nKAVX3sKU3/GpF01RYRWSAvz6FgDJ5Y8tvDMpYul1G+H9pOPcuslHW9868YNkx6zj\nGGIG9eXMFh+Yvsqp9SS3XG/6tANJGsF9JAK1Z5UxBwrlZnzgfTq17N6FXR5XLrxc\nJVEH2zM3/THCR/C78kcqgItxtKrU0Iw5R361jY/BO4k6j+XGOo1qiJ/ekxnQQ+aF\n3XFZQGRUBPQkhJqo52eOijU/PtC8+kiCEMUvuj8jZKRDZ+tau16Dzz7k1GHtTzcn\n5qS2Sq/6IBgoDTQZH25akVGjaKubP7oEZxGEtAQbMQKBgQDdriAjz0AbUBiqwbFA\nFVR8L2E405YD4UvBAu31Yb1o3OuAZohYfIcRCYrw0CNrkgHXfwqESICpun8/1Mh/\nZifyuWjkkDVJkU+gxvQcOwLd4+XKmBESsdAKwUCncrOvrt1XOiPpKjPJTOrl2I58\nT1DaP1fXFFdUSk5xeNJCgjAsswKBgQDDbqqp5napxjFgSGMNo9w1kUD0/7sXXO7v\nT+O3fs37+2B1OQw/+ylBz1b8Iqv2r8WrQ5RSv43Q1D+84mG+x5vHuLwHCai18eQH\n4MwIjGCwa9fKfCVXJkDrjf56qciJNN8zAGZvV095RzkcgkLAbWSz4KUuud8WbTY0\njvDLeq/6XwKBgDAbL2JWAWVr9k5oBh0QA+uHJKP+Vpm09ImIJzeO5FmzR2/v0DrT\nm0P5PCuSH32ii7/GE/Qs/67Vh/PEK1ZqRtUHo1mmacnzPMJ5KlROAgtA/4b9hQb3\ni1wqH+u2moPPgL0DIvPgcqiGhpsmaZVUaQlToa5M/b6O+YLqY0aHlgi9AoGAbQ1h\n2jCp4o6fmtSJwWDATnvhPVU+Nwk6ovt3XDs8AfIBnyfYOBOUsA5cwZEvWBY5PRoW\nuB3/qpnlfybr2CNWQBpLgbnYFL8HuYWtFNAQXCGxZmHkDD9iVo8Dg7seFcIVEkaU\n4mhcBpbBvbDKQspIOT+PrQU3ATKr3qQspb6uWA0CgYEAifKmN7IEChIj7H9GVkFg\nz4V+xpSpGFnWDgyUYDiX4vHjIMd0NQpi7nAm8k5l50olUm6T/5ANft3l2AAqBiJx\n6A/EQic5HtSQCwXJKLAj5mR7n4YZvGuF32uZAELmJLoFNAD82FuclBN1Jx+Y/guY\nEye4OK8TxEJqCQolPfnb7Us=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
        };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
    process.exit(1);
  }
}

const db = admin.firestore();

async function seedNeurozen() {
  console.log('🚀 Starting Neurozen Lab Seeding...');
  const storeId = 'neurozen_lab';
  const storeRef = db.collection('stores').doc(storeId);

  try {
    // 1. Create/Update Store Document
    await storeRef.set({
      name: 'NEUROZEN LAB',
      specialization: 'Functional Dietary Supplements',
      status: 'active',
      last_seeded: admin.firestore.FieldValue.serverTimestamp(),
      currency: 'USD',
      timezone: 'America/Los_Angeles'
    }, { merge: true });
    console.log('✅ Store document initialized.');

    // 2. Seed Products Sub-collection
    console.log('📦 Seeding Products...');
    const productBatch = db.batch();
    NEUROZEN_PRODUCTS.forEach((product) => {
      const pRef = storeRef.collection('products').doc(product.id);
      productBatch.set(pRef, {
        ...product,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });
    await productBatch.commit();
    console.log(`✅ ${NEUROZEN_PRODUCTS.length} products seeded.`);

    // 3. Seed Webhooks Queue Sub-collection
    console.log('⚡ Seeding Webhooks Queue...');
    const webhookBatch = db.batch();
    SHOPIFY_WEBHOOKS.forEach((webhook) => {
      const wRef = storeRef.collection('webhooks_queue').doc(webhook.id);
      webhookBatch.set(wRef, {
        ...webhook,
        processedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });
    await webhookBatch.commit();
    console.log(`✅ ${SHOPIFY_WEBHOOKS.length} webhook events seeded.`);

    // 4. Seed Agent Telemetry Sub-collection
    console.log('🤖 Seeding Agent Telemetry...');
    const agentBatch = db.batch();
    AGENT_FLEET_LOGS.forEach((log) => {
      const lRef = storeRef.collection('agent_telemetry').doc(log.id);
      agentBatch.set(lRef, {
        ...log,
        receivedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });
    await agentBatch.commit();
    console.log(`✅ ${AGENT_FLEET_LOGS.length} agent logs seeded.`);

    console.log('✨ Neurozen Lab Seeding Complete! Workspace is ready.');
  } catch (error) {
    console.error('❌ Seeding Failed:', error);
  } finally {
    process.exit(0);
  }
}

// Execute the seeder
seedNeurozen();
