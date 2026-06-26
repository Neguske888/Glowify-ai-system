import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Product, Customer, Order, Notification, DashboardMetrics } from '../types';

interface DataContextType {
  products: Product[];
  customers: Customer[];
  orders: Order[];
  notifications: Notification[];
  metrics: DashboardMetrics;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
}

const defaultMetrics: DashboardMetrics = {
  revenue: { value: 0, change: 0, trend: 'up' },
  orders: { value: 0, change: 0, trend: 'up' },
  customers: { value: 0, change: 0, trend: 'up' },
  conversion: { value: 0, change: 0, trend: 'up' },
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>(defaultMetrics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculateMetrics = (orders: Order[], customers: Customer[]) => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;
    const totalCustomers = customers.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    return {
      revenue: {
        value: totalRevenue,
        change: 12.5,
        trend: 'up' as const,
      },
      orders: {
        value: totalOrders,
        change: 8.3,
        trend: 'up' as const,
      },
      customers: {
        value: totalCustomers,
        change: 5.2,
        trend: 'up' as const,
      },
      conversion: {
        value: avgOrderValue,
        change: 3.1,
        trend: 'up' as const,
      },
    };
  };

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Generate mock data for demo - replace with real API calls
      const mockProducts: Product[] = [
        { id: 'p1', title: 'Hydrating Serum', vendor: 'GlowBrand', type: 'Skincare', price: 45, inventory: 234, sku: 'HYS-001', image: '', tags: ['bestseller'], revenue: 12450, units: 276 },
        { id: 'p2', title: 'Vitamin C Cream', vendor: 'GlowBrand', type: 'Skincare', price: 62, inventory: 156, sku: 'VCC-002', image: '', tags: ['new'], revenue: 9672, units: 156 },
        { id: 'p3', title: 'Night Repair Mask', vendor: 'GlowBrand', type: 'Mask', price: 38, inventory: 89, sku: 'NRM-003', image: '', tags: [], revenue: 6812, units: 179 },
        { id: 'p4', title: 'Moisturizing Lotion', vendor: 'GlowBrand', type: 'Body', price: 29, inventory: 412, sku: 'MOL-004', image: '', tags: ['essential'], revenue: 11948, units: 412 },
        { id: 'p5', title: 'Eye Cream', vendor: 'GlowBrand', type: 'Skincare', price: 78, inventory: 67, sku: 'EYC-005', image: '', tags: ['premium'], revenue: 5226, units: 67 },
      ];

      const mockCustomers: Customer[] = [
        { id: 'c1', name: 'Sarah Chen', email: 'sarah@example.com', totalOrders: 12, totalSpent: 680, lastOrder: '2024-01-15', segment: 'VIP', ltv: 680, tags: ['loyal'] },
        { id: 'c2', name: 'Alex Rodriguez', email: 'alex@example.com', totalOrders: 8, totalSpent: 420, lastOrder: '2024-01-14', segment: 'Active', ltv: 420, tags: [] },
        { id: 'c3', name: 'Jamie Park', email: 'jamie@example.com', totalOrders: 5, totalSpent: 310, lastOrder: '2024-01-12', segment: 'Regular', ltv: 310, tags: ['new'] },
        { id: 'c4', name: 'Emma Wilson', email: 'emma@example.com', totalOrders: 15, totalSpent: 890, lastOrder: '2024-01-16', segment: 'VIP', ltv: 890, tags: ['loyal', 'wholesale'] },
        { id: 'c5', name: 'Michael Brown', email: 'michael@example.com', totalOrders: 3, totalSpent: 145, lastOrder: '2024-01-10', segment: 'New', ltv: 145, tags: ['new'] },
      ];

      const mockOrders: Order[] = [
        { id: 'o1', orderNumber: 1001, customer: 'Sarah Chen', customerEmail: 'sarah@example.com', total: 124, status: 'delivered', fulfillmentStatus: 'fulfilled', createdAt: '2024-01-15', items: [{ productId: 'p1', title: 'Hydrating Serum', quantity: 2, price: 45 }] },
        { id: 'o2', orderNumber: 1002, customer: 'Alex Rodriguez', customerEmail: 'alex@example.com', total: 89, status: 'shipped', fulfillmentStatus: 'partial', createdAt: '2024-01-14', items: [{ productId: 'p2', title: 'Vitamin C Cream', quantity: 1, price: 62 }] },
        { id: 'o3', orderNumber: 1003, customer: 'Emma Wilson', customerEmail: 'emma@example.com', total: 245, status: 'processing', fulfillmentStatus: 'unfulfilled', createdAt: '2024-01-16', items: [{ productId: 'p1', title: 'Hydrating Serum', quantity: 3, price: 45 }] },
      ];

      setProducts(mockProducts);
      setCustomers(mockCustomers);
      setOrders(mockOrders);
      setMetrics(calculateMetrics(mockOrders, mockCustomers));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        products,
        customers,
        orders,
        notifications,
        metrics,
        loading,
        error,
        refreshData,
        addNotification,
        markNotificationRead,
        clearNotifications,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;
