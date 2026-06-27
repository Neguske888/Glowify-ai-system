// src/services/aiService.ts
// AI Automation Service - Handles Gemini API calls with caching

import { 
  doc, 
  collection, 
  getDoc, 
  setDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// Types
export interface ShopifyProduct {
  id: string | number;
  title: string;
  description?: string;
  vendor?: string;
  product_type?: string;
  tags?: string[];
  variants?: Array<{
    price?: string;
    sku?: string;
  }>;
  images?: Array<{ src?: string }>;
}

export interface KlaviyoMetric {
  id: string;
  event_name: string;
  properties?: Record<string, any>;
  customer_email?: string;
  timestamp?: string;
}

export interface AIGenerationRequest {
  type: 'product_marketing' | 'email_campaign' | 'customer_response';
  content: ShopifyProduct | KlaviyoMetric;
  options?: {
    tone?: 'professional' | 'casual' | 'urgent' | 'luxury';
    length?: 'short' | 'medium' | 'long';
    include_emoji?: boolean;
  };
}

export interface AIGenerationResult {
  success: boolean;
  content?: string;
  error?: string;
  cached?: boolean;
  generationId?: string;
}

export interface AIGenerationLog {
  id: string;
  type: string;
  contentId: string;
  content: string;
  cached: boolean;
  createdAt: any;
  expiresAt: Date;
}

// Cache duration: 7 days
const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

// Gemini API Configuration
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * Generate marketing copy using Gemini AI
 */
export async function generateMarketingCopy(
  apiKey: string,
  product: ShopifyProduct
): Promise<string> {
  const prompt = buildProductMarketingPrompt(product);
  return callGeminiAPI(apiKey, prompt);
}

/**
 * Generate email campaign content
 */
export async function generateEmailCampaign(
  apiKey: string,
  metric: KlaviyoMetric
): Promise<string> {
  const prompt = buildEmailCampaignPrompt(metric);
  return callGeminiAPI(apiKey, prompt);
}

/**
 * Generate customer response
 */
export async function generateCustomerResponse(
  apiKey: string,
  metric: KlaviyoMetric
): Promise<string> {
  const prompt = buildCustomerResponsePrompt(metric);
  return callGeminiAPI(apiKey, prompt);
}

/**
 * Main AI service function with caching
 */
export async function processWithAI(
  uid: string,
  request: AIGenerationRequest
): Promise<AIGenerationResult> {
  try {
    const { type, content, options } = request;
    const contentId = extractContentId(content, type);
    
    // Check cache first
    const cachedResult = await checkCache(uid, type, contentId);
    if (cachedResult) {
      return {
        success: true,
        content: cachedResult.content,
        cached: true,
        generationId: cachedResult.id
      };
    }
    
    // Get user's Gemini API key from Firestore
    const userDoc = await getDoc(doc(db, 'users', uid));
    const userData = userDoc.data();
    const geminiApiKey = userData?.geminiApiKey;
    
    if (!geminiApiKey) {
      return {
        success: false,
        error: 'Gemini API key not configured. Please add it in Settings.'
      };
    }
    
    // Generate content based on type
    let generatedContent: string;
    
    switch (type) {
      case 'product_marketing':
        generatedContent = await generateMarketingCopy(geminiApiKey, content as ShopifyProduct);
        break;
      case 'email_campaign':
        generatedContent = await generateEmailCampaign(geminiApiKey, content as KlaviyoMetric);
        break;
      case 'customer_response':
        generatedContent = await generateCustomerResponse(geminiApiKey, content as KlaviyoMetric);
        break;
      default:
        return {
          success: false,
          error: 'Unknown generation type'
        };
    }
    
    // Store in cache
    await storeInCache(uid, type, contentId, generatedContent);
    
    return {
      success: true,
      content: generatedContent,
      cached: false
    };
  } catch (error: any) {
    console.error('AI Service error:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate content'
    };
  }
}

// ─── Cache Functions ───────────────────────────────────────────────────────────

/**
 * Check if we have a cached generation for this content
 */
async function checkCache(
  uid: string, 
  type: string, 
  contentId: string
): Promise<AIGenerationLog | null> {
  try {
    const cacheRef = collection(db, 'users', uid, 'ai_cache');
    const q = query(
      cacheRef,
      where('type', '==', type),
      where('contentId', '==', contentId),
      where('expiresAt', '>', new Date())
    );
    
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as AIGenerationLog;
    }
    
    return null;
  } catch (error) {
    console.warn('Cache check failed:', error);
    return null;
  }
}

/**
 * Store generated content in cache
 */
async function storeInCache(
  uid: string,
  type: string,
  contentId: string,
  content: string
): Promise<void> {
  try {
    const cacheRef = collection(db, 'users', uid, 'ai_cache');
    const generationId = `${type}_${contentId}_${Date.now()}`;
    
    await setDoc(doc(cacheRef, generationId), {
      type,
      contentId,
      content,
      cached: false,
      createdAt: serverTimestamp(),
      expiresAt: new Date(Date.now() + CACHE_DURATION_MS)
    });
  } catch (error) {
    console.warn('Failed to store in cache:', error);
  }
}

/**
 * Clean expired cache entries (run periodically)
 */
export async function cleanExpiredCache(uid: string): Promise<number> {
  try {
    const cacheRef = collection(db, 'users', uid, 'ai_cache');
    const q = query(
      cacheRef,
      where('expiresAt', '<=', new Date())
    );
    
    const snapshot = await getDocs(q);
    let deletedCount = 0;
    
    for (const docSnapshot of snapshot.docs) {
      await docSnapshot.ref.delete();
      deletedCount++;
    }
    
    return deletedCount;
  } catch (error) {
    console.error('Cache cleanup failed:', error);
    return 0;
  }
}

// ─── Drafts Functions ─────────────────────────────────────────────────────────

export interface Draft {
  id: string;
  type: 'product_marketing' | 'email_campaign' | 'customer_response';
  status: 'pending' | 'approved' | 'generated';
  sourceId: string;
  sourceType: 'shopify_product' | 'klaviyo_metric';
  title: string;
  originalContent?: any;
  generatedContent?: string;
  createdAt: any;
  updatedAt: any;
}

/**
 * Get all drafts awaiting approval
 */
export async function getDrafts(uid: string): Promise<Draft[]> {
  try {
    const draftsRef = collection(db, 'users', uid, 'drafts');
    const q = query(draftsRef, orderBy('createdAt', 'desc'));
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Draft));
  } catch (error) {
    console.error('Failed to get drafts:', error);
    return [];
  }
}

/**
 * Create a new draft
 */
export async function createDraft(
  uid: string,
  draft: Omit<Draft, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    const draftsRef = collection(db, 'users', uid, 'drafts');
    const newDocRef = doc(draftsRef);
    
    await setDoc(newDocRef, {
      ...draft,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return newDocRef.id;
  } catch (error) {
    console.error('Failed to create draft:', error);
    throw error;
  }
}

/**
 * Update a draft's generated content
 */
export async function updateDraftContent(
  uid: string,
  draftId: string,
  content: string
): Promise<void> {
  try {
    await setDoc(
      doc(db, 'users', uid, 'drafts', draftId),
      {
        generatedContent: content,
        status: 'generated',
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Failed to update draft:', error);
    throw error;
  }
}

/**
 * Approve a draft
 */
export async function approveDraft(
  uid: string,
  draftId: string
): Promise<void> {
  try {
    await setDoc(
      doc(db, 'users', uid, 'drafts', draftId),
      {
        status: 'approved',
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Failed to approve draft:', error);
    throw error;
  }
}

// ─── Prompt Builders ───────────────────────────────────────────────────────────

function buildProductMarketingPrompt(product: ShopifyProduct): string {
  return `You are an expert e-commerce copywriter for a beauty/skincare brand. 
Generate compelling marketing copy for this product.

Product Name: ${product.title}
${product.description ? `Description: ${product.description}` : ''}
${product.vendor ? `Brand: ${product.vendor}` : ''}
${product.product_type ? `Category: ${product.product_type}` : ''}
${product.tags?.length ? `Tags: ${product.tags.join(', ')}` : ''}

Generate the following:
1. A catchy headline (max 10 words)
2. A compelling product description (2-3 sentences)
3. 3 key selling points with bullet points
4. A call-to-action (max 8 words)

Format your response in plain text with clear sections.`;
}

function buildEmailCampaignPrompt(metric: KlaviyoMetric): string {
  return `You are an expert email marketing copywriter for e-commerce brands.
Generate an email campaign based on this customer event:

Event: ${metric.event_name}
${metric.properties ? `Properties: ${JSON.stringify(metric.properties, null, 2)}` : ''}
${metric.customer_email ? `Customer: ${metric.customer_email}` : ''}

Generate:
1. Email subject line (max 60 characters)
2. Preview text (max 100 characters)
3. Email body content (3-4 short paragraphs)
4. CTA button text (max 5 words)

Make it engaging and action-oriented.`;
}

function buildCustomerResponsePrompt(metric: KlaviyoMetric): string {
  return `You are a friendly, professional customer service representative.
Generate a response to this customer interaction:

Event: ${metric.event_name}
${metric.properties ? `Details: ${JSON.stringify(metric.properties, null, 2)}` : ''}
${metric.customer_email ? `Customer: ${metric.customer_email}` : ''}

Generate a warm, helpful response that:
1. Acknowledges their interaction
2. Addresses any concerns or needs
3. Offers helpful next steps
4. Ends with a friendly closing

Keep it concise but personal.`;
}

// ─── Gemini API Call ──────────────────────────────────────────────────────────

async function callGeminiAPI(apiKey: string, prompt: string): Promise<string> {
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        topP: 0.8,
        topK: 40
      }
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error('Invalid response from Gemini API');
  }
  
  return data.candidates[0].content.parts[0].text;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractContentId(content: any, type: string): string {
  if (type === 'product_marketing') {
    return `product_${content.id}`;
  } else if (type === 'email_campaign' || type === 'customer_response') {
    return `metric_${content.id}`;
  }
  return `unknown_${Date.now()}`;
}

// Export individual generation functions for direct use
export const aiService = {
  generateMarketingCopy,
  generateEmailCampaign,
  generateCustomerResponse,
  processWithAI,
  getDrafts,
  createDraft,
  updateDraftContent,
  approveDraft,
  cleanExpiredCache
};

export default aiService;
