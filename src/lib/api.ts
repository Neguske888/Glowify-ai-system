// src/lib/api.ts

import { supabase } from './supabase';

export async function fetchDashboardData(userId: string) {
  try {
    // 0. Fetch Profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (profileError) throw profileError;

    // 1. Fetch KPIs & Revenue Snapshots (last 60 days)
    const { data: snapshots, error: snapshotsError } = await supabase
      .from('revenue_snapshots')
      .select('*')
      .eq('user_id', userId)
      .eq('channel', 'all')
      .order('snapshot_date', { ascending: true })
      .limit(60);

    if (snapshotsError) throw snapshotsError;

    // 2. Fetch Products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('user_id', userId)
      .order('units_sold', { ascending: false })
      .limit(8);

    if (productsError) throw productsError;

    // 3. Fetch AI Insights
    const { data: insights, error: insightsError } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('user_id', userId)
      .eq('is_dismissed', false)
      .order('priority', { ascending: true })
      .limit(5);

    if (insightsError) throw insightsError;

    // 4. Fetch AI Actions
    const { data: actions, error: actionsError } = await supabase
      .from('ai_actions')
      .select('*')
      .eq('user_id', userId)
      .order('executed_at', { ascending: false })
      .limit(5);

    if (actionsError) throw actionsError;

    // 5. Fetch Activity Feed
    const { data: activity, error: activityError } = await supabase
      .from('activity_feed')
      .select('*')
      .eq('user_id', userId)
      .order('occurred_at', { ascending: false })
      .limit(10);

    if (activityError) throw activityError;

    // 6. Fetch Automations
    const { data: automations, error: automationsError } = await supabase
      .from('automations')
      .select('*')
      .eq('user_id', userId)
      .order('actions_taken', { ascending: false });

    if (automationsError) throw automationsError;

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
    console.error('Failed to fetch dashboard data from Supabase:', error);
    throw error;
  }
}
