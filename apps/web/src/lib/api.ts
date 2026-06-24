// src/lib/api.ts

import { getFirestore, doc, getDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { getApp } from 'firebase/app';

const db = getFirestore(getApp());

export async function fetchDashboardData(userId: string) {
  try {
    // Define all queries to be executed in parallel
    const queries = [
      // 0. Fetch Profile
      getDoc(doc(db, 'profiles', userId)),
      
      // 1. Fetch KPIs & Revenue Snapshots (last 60 days)
      getDocs(query(
        collection(db, 'revenue_snapshots'),
        where('user_id', '==', userId),
        where('channel', '==', 'all'),
        orderBy('snapshot_date', 'asc'),
        limit(60)
      )),
      
      // 2. Fetch Products
      getDocs(query(
        collection(db, 'products'),
        where('user_id', '==', userId),
        orderBy('units_sold', 'desc'),
        limit(8)
      )),
      
      // 3. Fetch AI Insights
      getDocs(query(
        collection(db, 'ai_insights'),
        where('user_id', '==', userId),
        where('is_dismissed', '==', false),
        orderBy('priority', 'asc'),
        limit(5)
      )),
      
      // 4. Fetch AI Actions
      getDocs(query(
        collection(db, 'ai_actions'),
        where('user_id', '==', userId),
        orderBy('executed_at', 'desc'),
        limit(5)
      )),
      
      // 5. Fetch Activity Feed
      getDocs(query(
        collection(db, 'activity_feed'),
        where('user_id', '==', userId),
        orderBy('occurred_at', 'desc'),
        limit(10)
      )),
      
      // 6. Fetch Automations
      getDocs(query(
        collection(db, 'automations'),
        where('user_id', '==', userId),
        orderBy('actions_taken', 'desc')
      ))
    ];

    // Execute all queries in parallel
    const results = await Promise.all(queries);

    // Destructure results and map data
    const profileDoc = results[0] as any;
    const snapshotsSnap = results[1] as any;
    const productsSnap = results[2] as any;
    const insightsSnap = results[3] as any;
    const actionsSnap = results[4] as any;
    const activitySnap = results[5] as any;
    const automationsSnap = results[6] as any;

    return {
      profile: profileDoc.exists() ? profileDoc.data() : null,
      snapshots: snapshotsSnap.docs.map((doc: any) => doc.data()),
      products: productsSnap.docs.map((doc: any) => doc.data()),
      insights: insightsSnap.docs.map((doc: any) => doc.data()),
      actions: actionsSnap.docs.map((doc: any) => doc.data()),
      activity: activitySnap.docs.map((doc: any) => doc.data()),
      automations: automationsSnap.docs.map((doc: any) => doc.data())
    };
  } catch (error) {
    console.error('Failed to fetch dashboard data from Firestore:', error);
    throw error;
  }
}
