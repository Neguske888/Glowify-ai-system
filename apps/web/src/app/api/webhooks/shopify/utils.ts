import crypto from 'crypto';

/**
 * Verifies the authenticity of a Shopify webhook request using the HMAC header.
 */
export async function verifyShopifyWebhook(req: Request): Promise<boolean> {
  try {
    const hmac = req.headers.get('x-shopify-hmac-sha256');
    if (!hmac) return false;

    // Clone request to avoid consuming body stream
    const clonedReq = req.clone();
    const body = await clonedReq.text();
    const secret = process.env.SHOPIFY_WEBHOOK_SECRET || 'test_secret';

    const digest = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('base64');

    return digest === hmac;
  } catch (error) {
    console.error('Error verifying Shopify webhook signature:', error);
    return false;
  }
}
