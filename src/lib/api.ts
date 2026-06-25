// src/lib/api.ts
import { getFirestore, collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { getApp } from 'firebase/app';

const db = getFirestore(getApp());

export async function fetchDashboardData(userId: string) {
  try {
    const queries = [
      // 1. Revenue Snapshots
      getDocs(query(
        collection(db, 'users', userId, 'revenue_snapshots'),
        orderBy('createdAt', 'desc'),
        limit(30)
      )),
      
      // 2. Products
      getDocs(query(
        collection(db, 'users', userId, 'products'),
        orderBy('sales', 'desc'),
        limit(10)
      )),
      
      // 3. Activity Feed
      getDocs(query(
        collection(db, 'users', userId, 'activity_feed'),
        orderBy('createdAt', 'desc'),
        limit(20)
      ))
    ];

    const results = await Promise.all(queries);

    return {
      snapshots: results[0].docs.map(d => ({ id: d.id, ...d.data() })),
      products:  results[1].docs.map(d => ({ id: d.id, ...d.data() })),
      activity:  results[2].docs.map(d => ({ id: d.id, ...d.data() }))
    };
  } catch (error) {
    console.error('Glowify: fetchDashboardData FAILED:', error);
    return { snapshots: [], products: [], activity: [] };
  }
}
