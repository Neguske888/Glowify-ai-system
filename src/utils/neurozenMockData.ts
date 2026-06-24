/**
 * NEUROZEN LAB - Enterprise Mock Data Suite
 * Specialized for functional dietary supplements & Nootropics.
 */

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
  agent: 'Inventory-Sentinel' | 'Pricing-Optimizer' | 'SEO-Architect' | 'Neuro-Core';
  timestamp: string;
  reasoning: string;
  action: string;
  impactScore: number;
}

// 1. PRODUCTS: Neurozen Catalog
export const NEUROZEN_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    title: "Lion's Mane Nootropic Focus",
    price: 48.00,
    costOfGoods: 12.50,
    stockLevel: 142,
    reorderPoint: 50,
    dailyVelocity: 18.5,
    status: 'active',
    category: 'Cognitive'
  },
  {
    id: 'prod_2',
    title: "Reishi Sleep Elixir",
    price: 42.00,
    costOfGoods: 10.80,
    stockLevel: 12, // DANGEROUSLY LOW
    reorderPoint: 40,
    dailyVelocity: 12.2,
    status: 'low_stock',
    category: 'Sleep'
  },
  {
    id: 'prod_3',
    title: "Cordyceps Energy Blend",
    price: 45.00,
    costOfGoods: 11.20,
    stockLevel: 8, // DANGEROUSLY LOW
    reorderPoint: 45,
    dailyVelocity: 15.8,
    status: 'low_stock',
    category: 'Energy'
  },
  {
    id: 'prod_4',
    title: "Ashwagandha Anti-Cortisol",
    price: 38.00,
    costOfGoods: 9.50,
    stockLevel: 210,
    reorderPoint: 60,
    dailyVelocity: 22.4,
    status: 'active',
    category: 'Stress'
  },
  {
    id: 'prod_5',
    title: "Chaga Immune Defense",
    price: 52.00,
    costOfGoods: 14.00,
    stockLevel: 0, // OUT OF STOCK
    reorderPoint: 30,
    dailyVelocity: 8.5,
    status: 'out_of_stock',
    category: 'Immunity'
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
      order_id: 'NZ-9921',
      total_price: '93.00',
      line_items: [
        { title: "Lion's Mane Nootropic Focus", quantity: 1 },
        { title: "Cordyceps Energy Blend", quantity: 1 }
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
      sku: 'NZ-REISHI-01',
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
      order_id: 'NZ-9920',
      total_price: '42.00',
      line_items: [{ title: "Reishi Sleep Elixir", quantity: 1 }]
    }
  }
];

// 3. AGENT LOGS: Gemini Fleet Reasoning
export const AGENT_FLEET_LOGS: AgentLog[] = [
  {
    id: 'log_001',
    agent: 'Inventory-Sentinel',
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    reasoning: "Cordyceps Energy Blend stock (8) is below critical threshold. Projected stockout in 14 hours based on rolling 7D velocity.",
    action: "Generated Purchase Order draft #PO-NZ-881; notified Supplier 'Fungi-Direct'.",
    impactScore: 9.2
  },
  {
    id: 'log_002',
    agent: 'Pricing-Optimizer',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    reasoning: "Conversion rate for Ashwagandha dropped 12% following competitor price drop. Margin remains healthy at 75%.",
    action: "Adjusted retail price from $39.99 to $38.00; updated Meta Ads catalog.",
    impactScore: 7.8
  },
  {
    id: 'log_003',
    agent: 'SEO-Architect',
    timestamp: new Date(Date.now() - 1000 * 3600 * 2).toISOString(),
    reasoning: "Search volume for 'Nootropic Focus' surged 40% on Google Trends. Product page current bounce rate: 45%.",
    action: "Rewrote meta-descriptions and optimized H1 headers for 'Lion's Mane Nootropic Focus'.",
    impactScore: 6.5
  },
  {
    id: 'log_004',
    agent: 'Inventory-Sentinel',
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    reasoning: "Chaga Immune Defense currently OOS. Detected 14 abandoned carts containing this SKU in last 4 hours.",
    action: "Triggered 'Back in Stock' email capture modal for Chaga product page.",
    impactScore: 8.9
  }
];
