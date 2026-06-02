import axios from 'axios';
import crypto from 'crypto';
import assert from 'assert';

const API_BASE = 'http://localhost:3000';
const SHOPIFY_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET || 'test_secret';

async function testAuth() {
  console.log('Running: API Auth Validation...');
  try {
    await axios.post(`${API_BASE}/api/observability/events`, {}, { headers: { 'x-api-key': 'non-existent' } });
    assert.fail('Should have been 401');
  } catch (e: any) {
    assert.strictEqual(e.response.status, 401);
    console.log('PASS: Unauthorized request blocked.');
  }
}

async function testSafeMode() {
  console.log('Running: SAFE_MODE Enforcement...');
  // Assuming a tenant configured with safeMode: true
  try {
    await axios.post(`${API_BASE}/api/execute/run`, {}, { headers: { 'x-api-key': 'safe-mode-tenant-key' } });
    assert.fail('Should have been 403');
  } catch (e: any) {
    assert.strictEqual(e.response.status, 403);
    console.log('PASS: Execution blocked for safe-mode tenant.');
  }
}

async function testWebhookSignature() {
  console.log('Running: Webhook Security (Invalid Signature)...');
  const body = JSON.stringify({ id: '123' });
  try {
    await axios.post(`${API_BASE}/api/webhooks/shopify`, body, {
      headers: { 'x-shopify-hmac-sha256': 'wrong-hmac' }
    });
    assert.fail('Should have been 401');
  } catch (e: any) {
    assert.strictEqual(e.response.status, 401);
    console.log('PASS: Invalid signature rejected.');
  }
}

async function runHarness() {
  try {
    await testAuth();
    await testSafeMode();
    await testWebhookSignature();
    console.log('\n--- ALL SECURITY TESTS PASSED ---');
  } catch (err) {
    console.error('\n--- SECURITY TEST FAILURE ---');
    console.error(err);
    process.exit(1);
  }
}

runHarness();
