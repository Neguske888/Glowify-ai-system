// src/app/api/settings/test/route.ts
import { NextRequest, NextResponse } from 'next/server';

/**
 * Test Connection API Endpoint
 * 
 * This endpoint receives diagnostic action parameters from the frontend's 
 * "Test Connection" buttons and returns a JSON status object with mock 
 * verification results simulating third-party connectivity testing.
 */

interface TestConnectionRequest {
  type: 'shopify' | 'klaviyo' | 'gemini' | 'shopify_domain';
  shopifyApiKey?: string;
  shopifyStoreDomain?: string;
  klaviyoApiKey?: string;
  geminiApiKey?: string;
  uid: string;
}

// Mock verification functions that simulate third-party connectivity testing
const mockVerification = {
  // Simulates verifying a Shopify store setup structure
  shopify: async (apiKey: string, storeDomain: string) => {
    // Simulate network latency for realistic UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Validate API key format (shpat_ or shpatla_ prefix)
    const validKeyPrefix = apiKey.startsWith('shpat_') || apiKey.startsWith('shpatla_');
    
    // Validate store domain format
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]\.myshopify\.com$/;
    const validDomain = domainRegex.test(storeDomain);
    
    if (!validKeyPrefix || !validDomain) {
      return {
        success: false,
        status: 'error',
        message: 'Invalid Shopify credentials or store domain',
        details: {
          apiKeyValid: validKeyPrefix,
          domainValid: validDomain,
          storeDetected: false,
          permissions: []
        }
      };
    }
    
    // Simulate successful connection with mock store data
    return {
      success: true,
      status: 'connected',
      message: 'Shopify connection verified successfully',
      details: {
        apiKeyValid: true,
        domainValid: true,
        storeDetected: true,
        storeName: storeDomain.split('.')[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        domain: storeDomain,
        permissions: ['read_products', 'read_orders', 'read_customers', 'write_fulfillments'],
        plan: 'Basic Shopify',
        location: 'US East'
      }
    };
  },

  // Simulates checking Klaviyo API authorization block
  klaviyo: async (apiKey: string) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Validate API key format (pk_ prefix for private key)
    const validKeyFormat = apiKey.startsWith('pk_');
    
    if (!validKeyFormat) {
      return {
        success: false,
        status: 'error',
        message: 'Invalid Klaviyo API key format',
        details: {
          apiKeyValid: false,
          accountDetected: false,
          listsCount: 0,
          campaignsCount: 0
        }
      };
    }
    
    // Simulate successful authorization check
    return {
      success: true,
      status: 'connected',
      message: 'Klaviyo authorization verified',
      details: {
        apiKeyValid: true,
        accountDetected: true,
        accountId: 'k_' + apiKey.slice(3, 11).padEnd(8, 'x'),
        listsCount: Math.floor(Math.random() * 10) + 2,
        campaignsCount: Math.floor(Math.random() * 25) + 5,
        subscribersCount: Math.floor(Math.random() * 50000) + 1000,
        lastSync: new Date().toISOString()
      }
    };
  },

  // Simulates checking Gemini API authorization block
  gemini: async (apiKey: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate API key format (AIza prefix)
    const validKeyFormat = apiKey.startsWith('AIza');
    
    if (!validKeyFormat) {
      return {
        success: false,
        status: 'error',
        message: 'Invalid Gemini API key format',
        details: {
          apiKeyValid: false,
          quotaAvailable: false,
          modelsAccessible: []
        }
      };
    }
    
    // Simulate successful authorization check
    return {
      success: true,
      status: 'connected',
      message: 'Gemini AI authorization verified',
      details: {
        apiKeyValid: true,
        quotaAvailable: true,
        quotaUsed: Math.floor(Math.random() * 30) + 5,
        quotaLimit: 100,
        modelsAccessible: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro'],
        defaultModel: 'gemini-1.5-flash',
        region: 'us-central1',
        lastUsed: new Date().toISOString()
      }
    };
  }
};

export async function POST(request: NextRequest) {
  try {
    const body: TestConnectionRequest = await request.json();
    const { type, shopifyApiKey, shopifyStoreDomain, klaviyoApiKey, geminiApiKey, uid } = body;

    // Validate required fields
    if (!uid) {
      return NextResponse.json({ 
        error: 'User authentication required',
        status: 'error'
      }, { status: 401 });
    }

    if (!type || !['shopify', 'klaviyo', 'gemini', 'shopify_domain'].includes(type)) {
      return NextResponse.json({
        error: 'Invalid connection type specified',
        status: 'error'
      }, { status: 400 });
    }

    let result;

    switch (type) {
      case 'shopify':
        if (!shopifyApiKey || !shopifyStoreDomain) {
          return NextResponse.json({
            error: 'Shopify API key and store domain are required',
            status: 'error'
          }, { status: 400 });
        }
        result = await mockVerification.shopify(shopifyApiKey, shopifyStoreDomain);
        break;

      case 'shopify_domain':
        if (!shopifyStoreDomain) {
          return NextResponse.json({
            error: 'Store domain is required',
            status: 'error'
          }, { status: 400 });
        }
        // Test only the domain (reuse shopify mock with empty/invalid key)
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]\.myshopify\.com$/;
        if (!domainRegex.test(shopifyStoreDomain)) {
          result = {
            success: false,
            status: 'error',
            message: 'Invalid Shopify store domain format',
            details: {
              domainValid: false,
              storeDetected: false
            }
          };
        } else {
          result = {
            success: true,
            status: 'connected',
            message: 'Shopify store domain verified',
            details: {
              domainValid: true,
              storeDetected: true,
              domain: shopifyStoreDomain,
              storeName: shopifyStoreDomain.split('.')[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
            }
          };
        }
        break;

      case 'klaviyo':
        if (!klaviyoApiKey) {
          return NextResponse.json({
            error: 'Klaviyo API key is required',
            status: 'error'
          }, { status: 400 });
        }
        result = await mockVerification.klaviyo(klaviyoApiKey);
        break;

      case 'gemini':
        if (!geminiApiKey) {
          return NextResponse.json({
            error: 'Gemini API key is required',
            status: 'error'
          }, { status: 400 });
        }
        result = await mockVerification.gemini(geminiApiKey);
        break;

      default:
        return NextResponse.json({
          error: 'Unknown connection type',
          status: 'error'
        }, { status: 400 });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Test connection error:', error);
    return NextResponse.json({
      error: 'Failed to test connection',
      status: 'error',
      message: 'An unexpected error occurred while testing the connection'
    }, { status: 500 });
  }
}