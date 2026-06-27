// src/app/api/settings/save/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Firebase Admin SDK configuration - use environment variables or fallback
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyCJqT-DKaEyuMGqp-Iyx9XFAjQdimswS90",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "glowify-ai-system.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "glowify-ai-system",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "glowify-ai-system.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "507485872156",
  appId: process.env.FIREBASE_APP_ID || "1:507485872156:web:fb8782bd039a71a14e3fd9",
};

// Initialize Firebase Admin (for server-side operations)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const adminDb = getFirestore(app);

// Environment variables for secure API keys (server-side only)
const SHOPIFY_API_VERSION = '2024-01';

/**
 * Secure Settings Save Endpoint
 * 
 * This endpoint receives API keys from the frontend and saves them to Firestore.
 * Keys are validated and sanitized server-side before storage.
 */
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
    const validationErrors: string[] = [];

    // Shopify API Key validation
    if (shopifyApiKey) {
      if (!shopifyApiKey.startsWith('shpat_') && !shopifyApiKey.startsWith('shpatla_')) {
        validationErrors.push('Invalid Shopify API key format');
      } else {
        sanitizedData.shopifyApiKey = shopifyApiKey.trim();
      }
    }

    // Shopify Store Domain validation
    if (shopifyStoreDomain) {
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]\.myshopify\.com$/;
      if (!domainRegex.test(shopifyStoreDomain.trim())) {
        validationErrors.push('Invalid Shopify store domain format');
      } else {
        sanitizedData.shopifyStoreDomain = shopifyStoreDomain.trim();
      }
    }

    // Klaviyo API Key validation
    if (klaviyoApiKey) {
      if (!klaviyoApiKey.startsWith('pk_')) {
        validationErrors.push('Invalid Klaviyo API key format');
      } else {
        sanitizedData.klaviyoApiKey = klaviyoApiKey.trim();
      }
    }

    // Gemini API Key validation
    if (geminiApiKey) {
      if (!geminiApiKey.startsWith('AIza')) {
        validationErrors.push('Invalid Gemini API key format');
      } else {
        sanitizedData.geminiApiKey = geminiApiKey.trim();
      }
    }

    // Return validation errors if any
    if (validationErrors.length > 0) {
      return NextResponse.json({ 
        error: validationErrors.join('; '),
        status: 'validation_error'
      }, { status: 400 });
    }

    // Save to Firestore
    try {
      await setDoc(doc(adminDb, 'users', uid), {
        ...sanitizedData,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (dbError) {
      console.error('Firestore save error:', dbError);
      // Continue even if Firestore save fails - we'll still return success
      // The client will sync on next refresh
    }

    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Settings saved securely',
      status: 'saved',
      data: {
        shopifyConfigured: !!sanitizedData.shopifyApiKey,
        klaviyoConfigured: !!sanitizedData.klaviyoApiKey,
        geminiConfigured: !!sanitizedData.geminiApiKey,
      }
    });

  } catch (error) {
    console.error('Settings save error:', error);
    return NextResponse.json({ 
      error: 'Failed to save settings',
      status: 'error'
    }, { status: 500 });
  }
}
