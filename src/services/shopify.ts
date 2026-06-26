const SHOPIFY_STORE_URL = import.meta.env.VITE_SHOPIFY_STORE_URL || 'serenova-global.myshopify.com';
const SHOPIFY_API_VERSION = '2024-01';

export interface ShopifyProduct {
  id: string;
  title: string;
  vendor: string;
  product_type: string;
  variants: Array<{
    id: string;
    price: string;
    inventory_quantity: number;
    sku: string;
  }>;
  images: Array<{ src: string }>;
  tags: string[];
}

export interface ShopifyOrder {
  id: string;
  order_number: number;
  customer: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  total_price: string;
  financial_status: string;
  fulfillment_status: string;
  created_at: string;
  line_items: Array<{
    product_id: string;
    title: string;
    quantity: number;
    price: string;
  }>;
}

export interface ShopifyCustomer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  orders_count: number;
  total_spent: string;
  created_at: string;
  tags: string[];
  last_order_id: string;
}

class ShopifyService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `https://${SHOPIFY_STORE_URL}/admin/api/${SHOPIFY_API_VERSION}`;
  }

  async getProducts(): Promise<ShopifyProduct[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products.json`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getOrders(limit = 50): Promise<ShopifyOrder[]> {
    try {
      const response = await fetch(`${this.baseUrl}/orders.json?limit=${limit}&status=any`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      return data.orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  async getCustomers(limit = 50): Promise<ShopifyCustomer[]> {
    try {
      const response = await fetch(`${this.baseUrl}/customers.json?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data = await response.json();
      return data.customers;
    } catch (error) {
      console.error('Error fetching customers:', error);
      return [];
    }
  }

  async getInventory(): Promise<Map<string, number>> {
    const inventory: Map<string, number> = new Map();
    try {
      const response = await fetch(`${this.baseUrl}/inventory_levels.json?inventory_item_ids=all`);
      if (!response.ok) throw new Error('Failed to fetch inventory');
      const data = await response.json();
      data.inventory_levels?.forEach((item: { inventory_item_id: string; available: number }) => {
        inventory.set(item.inventory_item_id, item.available);
      });
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
    return inventory;
  }
}

export const shopifyService = new ShopifyService();
export default shopifyService;
