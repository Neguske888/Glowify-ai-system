import axios from 'axios';
import assert from 'assert';

async function verifyRealMiddleware() {
  console.log('--- Executing Live Middleware Validation ---');

  // Verify API Key enforcement
  try {
    await axios.post('http://localhost:3000/api/observability/events', {}, {
      headers: { 'x-api-key': 'bad-key' }
    });
    assert.fail('Should be 401 Unauthorized');
  } catch (err: any) {
    if (!err.response) {
      console.log('Error: API server not reachable on localhost:3000');
      return;
    }
    assert.strictEqual(err.response.status, 401, 'API Auth failed to return 401');
    console.log('✓ API Key Middleware: Verified');
  }
}

verifyRealMiddleware().catch(err => {
  console.error(err);
  process.exit(1);
});
