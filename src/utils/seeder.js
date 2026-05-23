import { supabase } from '../lib/supabase';

/**
 * Seeds the Supabase database with mock data for a specific authenticated user.
 * @param {string} userId - The UUID of the authenticated user.
 * @param {string} email - The email address of the user.
 * @param {string} fullName - The full name of the user.
 */
export async function seedUserData(userId, email, fullName = 'Alex Johnson') {
  try {
    console.log('Starting seed process for user:', userId);

    // 1. Create Profile if not exists
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        email: email,
        full_name: fullName,
        store_name: 'Glowify Beauty Co.',
        shopify_domain: 'glowifybeauty.myshopify.com',
        plan: 'enterprise',
        plan_status: 'active',
        location: 'Austin, Texas, USA',
        onboarded_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    if (profileError) throw profileError;

    // 2. Create Store if not exists
    const { error: storeError } = await supabase
      .from('stores')
      .insert({
        user_id: userId,
        shopify_domain: 'glowifybeauty.myshopify.com',
        store_name: 'Glowify Beauty Co.',
        currency: 'USD',
        timezone: 'America/Chicago',
        is_active: true,
        last_synced_at: new Date().toISOString(),
      });
    // Ignore duplicate keys for stores
    if (storeError && !storeError.message.includes('duplicate key')) {
      console.warn('Store insert warning:', storeError.message);
    }

    // 3. Create 60 days of Revenue Snapshots
    const snapshots = [];
    const baseDate = new Date();
    for (let i = 0; i < 60; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() - (59 - i));
      const dateStr = date.toISOString().split('T')[0];

      snapshots.push({
        user_id: userId,
        snapshot_date: dateStr,
        total_revenue: parseFloat((3200 + (i / 59) * 3600 + Math.sin(i * 0.8) * 400 + Math.random() * 300).toFixed(2)),
        total_orders: Math.round(45 + (i / 59) * 55 + Math.random() * 15),
        conversion_rate: parseFloat((0.028 + Math.random() * 0.012).toFixed(4)),
        roas: parseFloat((3.8 + Math.random() * 1.4).toFixed(4)),
        aov: parseFloat((68 + Math.random() * 14).toFixed(2)),
        returning_customer_rate: parseFloat((0.35 + Math.random() * 0.12).toFixed(4)),
        refund_rate: parseFloat((0.01 + Math.random() * 0.02).toFixed(4)),
        channel: 'all'
      });
    }

    const { error: snapshotsError } = await supabase
      .from('revenue_snapshots')
      .upsert(snapshots, { onConflict: 'user_id,snapshot_date,channel' });
    if (snapshotsError) throw snapshotsError;

    // 4. Seed Products
    const productsList = [
      { shopify_product_id: 'SP001', title: 'Vitamin C Brightening Serum', product_type: 'Serum', units_sold: 420, total_revenue: 37800, avg_rating: 4.9, margin_percent: 68, total_inventory: 12, status: 'active' },
      { shopify_product_id: 'SP002', title: 'Retinol Night Repair Cream', product_type: 'Moisturiser', units_sold: 310, total_revenue: 24800, avg_rating: 4.7, margin_percent: 71, total_inventory: 48, status: 'active' },
      { shopify_product_id: 'SP003', title: 'SPF 50 Daily Shield', product_type: 'SPF', units_sold: 280, total_revenue: 16800, avg_rating: 4.6, margin_percent: 58, total_inventory: 92, status: 'active' },
      { shopify_product_id: 'SP004', title: 'Peptide Eye Cream', product_type: 'Eye Care', units_sold: 190, total_revenue: 15200, avg_rating: 4.8, margin_percent: 74, total_inventory: 31, status: 'active' },
      { shopify_product_id: 'SP005', title: 'Hydrating Rose Toner', product_type: 'Toner', units_sold: 160, total_revenue: 9600, avg_rating: 4.5, margin_percent: 61, total_inventory: 0, status: 'active' },
      { shopify_product_id: 'SP006', title: 'AHA/BHA Exfoliant', product_type: 'Exfoliant', units_sold: 140, total_revenue: 11200, avg_rating: 4.6, margin_percent: 66, total_inventory: 78, status: 'active' },
      { shopify_product_id: 'SP007', title: 'Niacinamide Pore Serum', product_type: 'Serum', units_sold: 120, total_revenue: 8400, avg_rating: 4.4, margin_percent: 63, total_inventory: 18, status: 'active' },
      { shopify_product_id: 'SP008', title: 'Collagen Boost Moisturiser', product_type: 'Moisturiser', units_sold: 98, total_revenue: 7840, avg_rating: 4.3, margin_percent: 69, total_inventory: 55, status: 'active' }
    ].map(p => ({ ...p, user_id: userId }));

    const { error: productsError } = await supabase
      .from('products')
      .upsert(productsList, { onConflict: 'user_id,shopify_product_id' });
    if (productsError) throw productsError;

    // 5. Seed Automations
    const automationsList = [
      { name: 'Abandoned Cart Recovery', automation_type: 'email', trigger_condition: 'Cart abandoned 1h', is_active: true, actions_taken: 847, revenue_attributed: 31200, last_triggered_at: new Date(Date.now() - 12 * 60 * 1000).toISOString() },
      { name: 'Low Stock Alert + PO', automation_type: 'inventory', trigger_condition: 'Stock < 20 units', is_active: true, actions_taken: 14, revenue_attributed: 0, last_triggered_at: new Date(Date.now() - 120 * 60 * 1000).toISOString() },
      { name: 'VIP Tier Auto-Tag', automation_type: 'crm', trigger_condition: '3rd purchase', is_active: true, actions_taken: 284, revenue_attributed: 12800, last_triggered_at: new Date(Date.now() - 240 * 60 * 1000).toISOString() },
      { name: 'Underperforming Ad Pause', automation_type: 'paid_ads', trigger_condition: 'ROAS < 2.5x for 24h', is_active: true, actions_taken: 7, revenue_attributed: 4200, last_triggered_at: new Date(Date.now() - 1440 * 60 * 1000).toISOString() },
      { name: 'Post-Purchase Review Request', automation_type: 'email', trigger_condition: '5 days post-delivery', is_active: true, actions_taken: 1840, revenue_attributed: 0, last_triggered_at: new Date(Date.now() - 180 * 60 * 1000).toISOString() },
      { name: 'Win-Back Sequence', automation_type: 'email', trigger_condition: '45 days no purchase', is_active: true, actions_taken: 810, revenue_attributed: 18400, last_triggered_at: new Date(Date.now() - 360 * 60 * 1000).toISOString() },
      { name: 'Price Match Alert', automation_type: 'pricing', trigger_condition: 'Competitor price drop', is_active: true, actions_taken: 23, revenue_attributed: 0, last_triggered_at: new Date(Date.now() - 1440 * 60 * 1000).toISOString() },
      { name: 'New Customer Welcome', automation_type: 'email', trigger_condition: 'First purchase', is_active: true, actions_taken: 1420, revenue_attributed: 7400, last_triggered_at: new Date(Date.now() - 8 * 60 * 1000).toISOString() },
      { name: 'Flash Sale Auto-Launch', automation_type: 'marketing', trigger_condition: 'Inventory > 200 units', is_active: false, actions_taken: 3, revenue_attributed: 14800, last_triggered_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() },
      { name: 'Upsell After Purchase', automation_type: 'email', trigger_condition: 'Post-checkout', is_active: true, actions_taken: 640, revenue_attributed: 9200, last_triggered_at: new Date(Date.now() - 60 * 60 * 1000).toISOString() }
    ].map(a => ({ ...a, user_id: userId }));

    // Remove existing automations before inserting to prevent duplicates
    await supabase.from('automations').delete().eq('user_id', userId);
    const { error: automationsError } = await supabase
      .from('automations')
      .insert(automationsList);
    if (automationsError) throw automationsError;

    // 6. Seed AI Actions
    const aiActionsList = [
      { action_type: 'paid_ads', title: 'Paused underperforming Facebook Ad Set #7', result: 'Saved $340 in wasted spend', status: 'completed', revenue_impact: 340, executed_at: new Date(Date.now() - 3 * 3600 * 1000).toISOString() },
      { action_type: 'email', title: 'Sent win-back campaign to 1840 lapsed customers', result: '$6,200 recovered in 48h', status: 'completed', revenue_impact: 6200, executed_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString() },
      { action_type: 'inventory', title: 'Triggered restock PO for Vitamin C Serum', result: '120 units ordered from supplier', status: 'completed', revenue_impact: 0, executed_at: new Date(Date.now() - 26 * 3600 * 1000).toISOString() },
      { action_type: 'paid_ads', title: 'Scaled Google Shopping budget +30%', result: 'ROAS at 5.2x, within target', status: 'completed', revenue_impact: 4200, executed_at: new Date(Date.now() - 72 * 3600 * 1000).toISOString() },
      { action_type: 'system', title: 'Detected mobile checkout bug on Safari', result: 'Flagged for dev team, ticket #1094', status: 'running', revenue_impact: 0, executed_at: new Date(Date.now() - 96 * 3600 * 1000).toISOString() },
      { action_type: 'email', title: 'Launched Flash Sale to VIP segment', result: '41% open rate, $14,800 GMV', status: 'completed', revenue_impact: 14800, executed_at: new Date(Date.now() - 120 * 3600 * 1000).toISOString() },
      { action_type: 'marketing', title: 'A/B test on PDP hero image started', result: 'Variant B winning by 12% CTR', status: 'running', revenue_impact: 0, executed_at: new Date(Date.now() - 168 * 3600 * 1000).toISOString() },
      { action_type: 'pricing', title: 'Auto-repriced 14 SKUs vs competitors', result: 'Avg margin +2.3%', status: 'completed', revenue_impact: 2100, executed_at: new Date(Date.now() - 216 * 3600 * 1000).toISOString() }
    ].map(a => ({ ...a, user_id: userId }));

    await supabase.from('ai_actions').delete().eq('user_id', userId);
    const { error: aiActionsError } = await supabase
      .from('ai_actions')
      .insert(aiActionsList);
    if (aiActionsError) throw aiActionsError;

    // 7. Seed AI Insights
    const aiInsightsList = [
      { insight_type: 'warning', title: 'Ad Frequency Too High', description: 'Facebook ad frequency hit 4.8x for your core audience. Creative fatigue likely. Rotate new ad sets within 48h.', priority: 1, estimated_impact: 1600 },
      { insight_type: 'opportunity', title: 'Bundle Upsell Untapped', description: '67% of Vitamin C buyers also view Retinol but do not convert. A bundle offer could recover $12K/month.', priority: 2, estimated_impact: 12000 },
      { insight_type: 'trend', title: 'Mobile Revenue Up 28%', description: 'Mobile now drives 61% of orders. Consider mobile-first campaign creatives.', priority: 3, estimated_impact: 0 }
    ].map(i => ({ ...i, user_id: userId }));

    await supabase.from('ai_insights').delete().eq('user_id', userId);
    const { error: aiInsightsError } = await supabase
      .from('ai_insights')
      .insert(aiInsightsList);
    if (aiInsightsError) throw aiInsightsError;

    // 8. Seed Activity Feed
    const activityFeedList = [
      { event_type: 'order', title: 'Order #8821 — New York, US', amount: 142, occurred_at: new Date(Date.now() - 1 * 60 * 1000).toISOString() },
      { event_type: 'order', title: 'Order #8820 — London, UK', amount: 89, occurred_at: new Date(Date.now() - 3 * 60 * 1000).toISOString() },
      { event_type: 'marketing', title: 'Flash Sale email sent to 4,200 subscribers', amount: null, occurred_at: new Date(Date.now() - 8 * 60 * 1000).toISOString() },
      { event_type: 'alert', title: 'Stock alert: Retinol Cream below 20 units', amount: null, occurred_at: new Date(Date.now() - 12 * 60 * 1000).toISOString() },
      { event_type: 'order', title: 'Order #8819 — Toronto, CA', amount: 210, occurred_at: new Date(Date.now() - 14 * 60 * 1000).toISOString() },
      { event_type: 'marketing', title: 'Facebook Campaign #3 spend hit daily cap', amount: null, occurred_at: new Date(Date.now() - 22 * 60 * 1000).toISOString() },
      { event_type: 'order', title: 'Order #8818 — Sydney, AU', amount: 67, occurred_at: new Date(Date.now() - 28 * 60 * 1000).toISOString() },
      { event_type: 'automation', title: 'Abandoned cart recovery — $340 recovered', amount: 340, occurred_at: new Date(Date.now() - 35 * 60 * 1000).toISOString() },
      { event_type: 'alert', title: 'Conversion drop detected on /collections/skincare', amount: null, occurred_at: new Date(Date.now() - 41 * 60 * 1000).toISOString() },
      { event_type: 'order', title: 'Order #8817 — Chicago, US', amount: 189, occurred_at: new Date(Date.now() - 47 * 60 * 1000).toISOString() },
      { event_type: 'marketing', title: 'Google Shopping ROAS reached 5.2x', amount: null, occurred_at: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
      { event_type: 'order', title: 'Order #8816 — Berlin, DE', amount: 93, occurred_at: new Date(Date.now() - 70 * 60 * 1000).toISOString() }
    ].map(e => ({ ...e, user_id: userId }));

    await supabase.from('activity_feed').delete().eq('user_id', userId);
    const { error: activityError } = await supabase
      .from('activity_feed')
      .insert(activityFeedList);
    if (activityError) throw activityError;

    console.log('Seed completed successfully for user:', userId);
    return { success: true };
  } catch (error) {
    console.error('Error seeding user database:', error);
    return { success: false, error: error.message };
  }
}
