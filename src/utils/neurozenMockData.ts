/**
2	 * GLOWIFY AI - Enterprise Mock Data Suite
3	 * Specialized for premium beauty & skincare products.
4	 */

export interface Product {
  id: string;
  title: string;
  price: number;
  costOfGoods: number;
  stockLevel: number;
  reorderPoint: number;
  dailyVelocity: number;
  status: 'active' | 'out_of_stock' | 'low_stock';
  category: string;
}

export interface WebhookEvent {
  id: string;
  topic: 'orders/create' | 'inventory/level_update' | 'products/update';
  payload: any;
  occurredAt: string;
  status: 'processed' | 'pending' | 'failed';
}

export interface AgentLog {
  id: string;
  agent: 'Inventory-Sentinel' | 'Pricing-Optimizer' | 'SEO-Architect' | 'Glow-Core';
  timestamp: string;
  reasoning: string;
  action: string;
  impactScore: number;
}

// 1. PRODUCTS: Glowify Catalog
export const NEUROZEN_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    title: "Vitamin C Brightening Serum",
    price: 89,
    costOfGoods: 18,
    stockLevel: 142,
    reorderPoint: 50,
    dailyVelocity: 18.5,
    status: 'active',
    category: 'Serums'
  },
  {
    id: 'prod_2',
    title: "Hyaluronic Moisture Surge",
    price: 65,
    costOfGoods: 14,
    stockLevel: 12,
    reorderPoint: 40,
    dailyVelocity: 12.2,
    status: 'low_stock',
    category: 'Moisturisers'
  },
  {
    id: 'prod_3',
    title: "AHA/BHA Exfoliating Cleanser",
    price: 52,
    costOfGoods: 11,
    stockLevel: 8,
    reorderPoint: 45,
    dailyVelocity: 15.8,
    status: 'low_stock',
    category: 'Cleansers'
  },
  {
    id: 'prod_4',
    title: "Retinol Night Renewal Cream",
    price: 120,
    costOfGoods: 28,
    stockLevel: 210,
    reorderPoint: 60,
    dailyVelocity: 22.4,
    status: 'active',
    category: 'Treatments'
  },
  {
    id: 'prod_5',
    title: "Peptide Firming Eye Serum",
    price: 95,
    costOfGoods: 22,
    stockLevel: 0,
    reorderPoint: 30,
    dailyVelocity: 8.5,
    status: 'out_of_stock',
    category: 'Serums'
  }
];

// 2. WEBHOOKS: Live Shopify Stream
export const SHOPIFY_WEBHOOKS: WebhookEvent[] = [
  {
    id: 'wh_101',
    topic: 'orders/create',
    occurredAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    status: 'processed',
    payload: {
      order_id: 'G-9921',
      total_price: '141.00',
      line_items: [
        { title: "Vitamin C Brightening Serum", quantity: 1 },
        { title: "AHA/BHA Exfoliating Cleanser", quantity: 1 }
      ],
      customer: { email: 'sarah.j@example.com', tags: ['VIP', 'Subscription'] }
    }
  },
  {
    id: 'wh_102',
    topic: 'inventory/level_update',
    occurredAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    status: 'processed',
    payload: {
      sku: 'GLOW-HYA-01',
      available: 12,
      location_id: 'primary-dist'
    }
  },
  {
    id: 'wh_103',
    topic: 'orders/create',
    occurredAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    status: 'processed',
    payload: {
      order_id: 'G-9920',
      total_price: '65.00',
      line_items: [{ title: "Hyaluronic Moisture Surge", quantity: 1 }]
    }
  }
];

// 3. AGENT LOGS: Gemini Fleet Reasoning
export const AGENT_FLEET_LOGS: AgentLog[] = [
  {
    id: 'log_001',
    agent: 'Inventory-Sentinel',
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    reasoning: "AHA/BHA Exfoliating Cleanser stock (8) is below critical threshold. Projected stockout in 14 hours based on rolling 7D velocity.",
    action: "Generated Purchase Order draft #PO-GLOW-881; notified Supplier 'BeautySupply-Co'.",
    impactScore: 9.2
  },
  {
    id: 'log_002',
    agent: 'Pricing-Optimizer',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    reasoning: "Conversion rate for Retinol Night Renewal Cream dropped 12% following competitor price drop. Margin remains healthy at 75%.",
    action: "Adjusted retail price from $125.00 to $120.00; updated Meta Ads catalog.",
    impactScore: 7.8
  },
  {
    id: 'log_003',
    agent: 'SEO-Architect',
    timestamp: new Date(Date.now() - 1000 * 3600 * 2).toISOString(),
    reasoning: "Search volume for 'Brightening Serum' surged 40% on Google Trends. Product page current bounce rate: 45%.",
    action: "Rewrote meta-descriptions and optimized H1 headers for 'Vitamin C Brightening Serum'.",
    impactScore: 6.5
  },
  {
    id: 'log_004',
    agent: 'Inventory-Sentinel',
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    reasoning: "Peptide Firming Eye Serum currently OOS. Detected 14 abandoned carts containing this SKU in last 4 hours.",
    action: "Triggered 'Back in Stock' email capture modal for Peptide product page.",
    impactScore: 8.9
  }
];
