export interface User {
  uid: string;
  email: string;
  displayName: string;
  storeName: string;
  plan: string;
  planStatus: string;
  photoURL?: string;
}

export interface DashboardMetrics {
  revenue: {
    value: number;
    change: number;
    trend: 'up' | 'down';
  };
  orders: {
    value: number;
    change: number;
    trend: 'up' | 'down';
  };
  customers: {
    value: number;
    change: number;
    trend: 'up' | 'down';
  };
  conversion: {
    value: number;
    change: number;
    trend: 'up' | 'down';
  };
}

export interface Product {
  id: string;
  title: string;
  vendor: string;
  type: string;
  price: number;
  inventory: number;
  sku: string;
  image: string;
  tags: string[];
  revenue: number;
  units: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  segment: string;
  ltv: number;
  tags: string[];
}

export interface Order {
  id: string;
  orderNumber: number;
  customer: string;
  customerEmail: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  fulfillmentStatus: string;
  createdAt: string;
  items: Array<{
    productId: string;
    title: string;
    quantity: number;
    price: number;
  }>;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: 'user' | 'team' | 'integration' | 'automation' | 'security' | 'billing';
  details: string;
  status: 'success' | 'pending' | 'failed';
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  status: 'active' | 'paused' | 'inactive';
  runs: number;
  revenue: number;
  lastRun: string;
}

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'running' | 'error';
  task: string;
  progress: number;
  createdAt: string;
}
