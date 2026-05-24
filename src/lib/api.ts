// src/lib/api.ts

import { getFirestore, doc, getDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { getApp } from 'firebase/app';

const db = getFirestore(getApp());

export async function fetchDashboardData(userId: string) {
  try {
    // 0. Fetch Profile
    const profileDoc = await getDoc(doc(db, 'profiles', userId));
    const profile = profileDoc.exists() ? profileDoc.data() : null;

    // 1. Fetch KPIs & Revenue Snapshots (last 60 days)
    const snapshotsQuery = query(
      collection(db, 'revenue_snapshots'),
      where('user_id', '==', userId),
      where('channel', '==', 'all'),
      orderBy('snapshot_date', 'asc'),
      limit(60)
    );
    const snapshotsSnap = await getDocs(snapshotsQuery);
    const snapshots = snapshotsSnap.docs.map(doc => doc.data());

    // 2. Fetch Products
    const productsQuery = query(
      collection(db, 'products'),
      where('user_id', '==', userId),
      orderBy('units_sold', 'desc'),
      limit(8)
    );
    const productsSnap = await getDocs(productsQuery);
    const products = productsSnap.docs.map(doc => doc.data());

    // 3. Fetch AI Insights
    const insightsQuery = query(
      collection(db, 'ai_insights'),
      where('user_id', '==', userId),
      where('is_dismissed', '==', false),
      orderBy('priority', 'asc'),
      limit(5)
    );
    const insightsSnap = await getDocs(insightsQuery);
    const insights = insightsSnap.docs.map(doc => doc.data());

    // 4. Fetch AI Actions
    const actionsQuery = query(
      collection(db, 'ai_actions'),
      where('user_id', '==', userId),
      orderBy('executed_at', 'desc'),
      limit(5)
    );
    const actionsSnap = await getDocs(actionsQuery);
    const actions = actionsSnap.docs.map(doc => doc.data());

    // 5. Fetch Activity Feed
    const activityQuery = query(
      collection(db, 'activity_feed'),
      where('user_id', '==', userId),
      orderBy('occurred_at', 'desc'),
      limit(10)
    );
    const activitySnap = await getDocs(activityQuery);
    const activity = activitySnap.docs.map(doc => doc.data());

    // 6. Fetch Automations
    const automationsQuery = query(
      collection(db, 'automations'),
      where('user_id', '==', userId),
      orderBy('actions_taken', 'desc')
    );
    const automationsSnap = await getDocs(automationsQuery);
    const automations = automationsSnap.docs.map(doc => doc.data());

    return {
      profile,
      snapshots,
      products,
      insights,
      actions,
      activity,
      automations
    };
  } catch (error) {
    console.error('Failed to fetch dashboard data from Firestore:', error);
    throw error;
  }
}
