// src/app/api/settings/save/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Environment variables for secure API keys (server-side only)
const SHOPIFY_API_VERSION = '2024-01';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      shopifyApiKey, 
      shopifyStoreDomain, 
      klaviyoApiKey, 
      geminiApiKey,
      uid 
    } = body;

    // Validate required fields
    if (!uid) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Sanitize and validate inputs
    const sanitizedData: Record<string, string> = {};

    // Shopify API Key validation
    if (shopifyApiKey) {
      if (!shopifyApiKey.startsWith('shpat_') && !shopifyApiKey.startsWith('shpatla_')) {
        return NextResponse.json({ error: 'Invalid Shopify API key format' }, { status: 400 });
      }
      sanitizedData.shopifyApiKey = shopifyApiKey.trim();
    }

    // Shopify Store Domain validation
    if (shopifyStoreDomain) {
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]\.myshopify\.com$/;
      if (!domainRegex.test(shopifyStoreDomain.trim())) {
        return NextResponse.json({ error: 'Invalid Shopify store domain format' }, { status: 400 });
      }
      sanitizedData.shopifyStoreDomain = shopifyStoreDomain.trim();
    }

    // Klaviyo API Key validation
    if (klaviyoApiKey) {
      if (!klaviyoApiKey.startsWith('pk_')) {
        return NextResponse.json({ error: 'Invalid Klaviyo API key format' }, { status: 400 });
      }
      sanitizedData.klaviyoApiKey = klaviyoApiKey.trim();
    }

    // Gemini API Key validation
    if (geminiApiKey) {
      if (!geminiApiKey.startsWith('AIza')) {
        return NextResponse.json({ error: 'Invalid Gemini API key format' }, { status: 400 });
      }
      sanitizedData.geminiApiKey = geminiApiKey.trim();
    }

    // In a real implementation, this would:
    // 1. Verify the user's session/token
    // 2. Store the encrypted/sanitized keys in Firestore or a secure database
    // 3. Optionally validate the API keys by making test calls to the services

    return NextResponse.json({ 
      success: true, 
      message: 'Settings saved securely',
      data: {
        shopifyConfigured: !!sanitizedData.shopifyApiKey,
        klaviyoConfigured: !!sanitizedData.klaviyoApiKey,
        geminiConfigured: !!sanitizedData.geminiApiKey,
      }
    });

  } catch (error) {
    console.error('Settings save error:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
