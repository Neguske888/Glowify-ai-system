-- =============================================
-- GLOWIFY AI — DATABASE SCHEMA
-- Migration 001 — Initial Schema
-- =============================================

-- Auto-update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ language 'plpgsql';

-- =============================================
-- TABLE: profiles
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  store_name text,
  shopify_domain text,
  shopify_access_token text, -- encrypted at rest via Supabase Vault in production
  shopify_client_id text,
  plan text DEFAULT 'starter' CHECK (plan IN ('starter','growth','enterprise')),
  plan_status text DEFAULT 'active',
  avatar_url text,
  location text,
  onboarded_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- =============================================
-- TABLE: stores
-- =============================================
CREATE TABLE IF NOT EXISTS stores (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  shopify_domain text NOT NULL,
  shopify_access_token text,
  shopify_client_id text,
  shopify_api_version text DEFAULT '2024-04',
  store_name text,
  currency text DEFAULT 'USD',
  timezone text DEFAULT 'America/Chicago',
  is_active boolean DEFAULT true,
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON stores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own stores" ON stores FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_stores_user_id ON stores(user_id);

-- =============================================
-- TABLE: revenue_snapshots
-- =============================================
CREATE TABLE IF NOT EXISTS revenue_snapshots (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  snapshot_date date NOT NULL,
  total_revenue numeric(12,2) DEFAULT 0,
  total_orders integer DEFAULT 0,
  conversion_rate numeric(5,4) DEFAULT 0,
  roas numeric(8,4) DEFAULT 0,
  aov numeric(10,2) DEFAULT 0,
  returning_customer_rate numeric(5,4) DEFAULT 0,
  refund_rate numeric(5,4) DEFAULT 0,
  channel text CHECK (channel IN ('shopify_organic','google_ads','meta_ads','email','direct','all')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, snapshot_date, channel)
);
CREATE TRIGGER update_revenue_snapshots_updated_at BEFORE UPDATE ON revenue_snapshots FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
ALTER TABLE revenue_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own revenue data" ON revenue_snapshots FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_revenue_snapshots_user_date ON revenue_snapshots(user_id, snapshot_date);

-- =============================================
-- TABLE: orders
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  shopify_order_id text NOT NULL,
  order_number text,
  customer_email text,
  customer_name text,
  total_price numeric(10,2),
  currency text DEFAULT 'USD',
  financial_status text,
  fulfillment_status text,
  line_items jsonb,
  shipping_address jsonb,
  source_name text,
  processed_at timestamptz,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, shopify_order_id)
);
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own orders" ON orders FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_orders_user_processed ON orders(user_id, processed_at DESC);

-- =============================================
-- TABLE: products
-- =============================================
CREATE TABLE IF NOT EXISTS products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  shopify_product_id text NOT NULL,
  title text NOT NULL,
  handle text,
  product_type text,
  vendor text,
  status text DEFAULT 'active',
  tags text[],
  variants jsonb,
  images jsonb,
  total_inventory integer DEFAULT 0,
  units_sold integer DEFAULT 0,
  total_revenue numeric(12,2) DEFAULT 0,
  avg_rating numeric(3,2) DEFAULT 0,
  margin_percent numeric(5,2) DEFAULT 0,
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, shopify_product_id)
);
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own products" ON products FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_products_user_id ON products(user_id);

-- =============================================
-- TABLE: customers
-- =============================================
CREATE TABLE IF NOT EXISTS customers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  shopify_customer_id text NOT NULL,
  email text,
  first_name text,
  last_name text,
  phone text,
  total_spent numeric(12,2) DEFAULT 0,
  orders_count integer DEFAULT 0,
  segment text DEFAULT 'new' CHECK (segment IN ('vip','loyal','recent','at_risk','lost','new')),
  tags text[],
  accepts_marketing boolean DEFAULT false,
  location_city text,
  location_country text,
  last_order_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, shopify_customer_id)
);
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own customers" ON customers FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_customers_user_segment ON customers(user_id, segment);

-- =============================================
-- TABLE: campaigns
-- =============================================
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  platform text CHECK (platform IN ('meta','google','klaviyo','tiktok','organic')),
  campaign_name text NOT NULL,
  campaign_id text,
  status text DEFAULT 'active' CHECK (status IN ('active','paused','completed','underperforming')),
  budget_daily numeric(10,2),
  total_spent numeric(12,2) DEFAULT 0,
  impressions integer DEFAULT 0,
  clicks integer DEFAULT 0,
  conversions integer DEFAULT 0,
  revenue_attributed numeric(12,2) DEFAULT 0,
  roas numeric(8,4) DEFAULT 0,
  ctr numeric(8,6) DEFAULT 0,
  open_rate numeric(5,4) DEFAULT 0,
  click_rate numeric(5,4) DEFAULT 0,
  period_start date,
  period_end date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own campaigns" ON campaigns FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_campaigns_user_platform ON campaigns(user_id, platform);

-- =============================================
-- TABLE: automations
-- =============================================
CREATE TABLE IF NOT EXISTS automations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  automation_type text CHECK (automation_type IN ('email','inventory','crm','paid_ads','pricing','marketing')),
  trigger_condition text,
  is_active boolean DEFAULT true,
  actions_taken integer DEFAULT 0,
  revenue_attributed numeric(12,2) DEFAULT 0,
  last_triggered_at timestamptz,
  config jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE TRIGGER update_automations_updated_at BEFORE UPDATE ON automations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own automations" ON automations FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_automations_user_id ON automations(user_id);

-- =============================================
-- TABLE: ai_actions
-- =============================================
CREATE TABLE IF NOT EXISTS ai_actions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  action_type text NOT NULL,
  title text NOT NULL,
  result text,
  status text DEFAULT 'completed' CHECK (status IN ('completed','running','scheduled','failed')),
  revenue_impact numeric(12,2) DEFAULT 0,
  metadata jsonb,
  executed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE TRIGGER update_ai_actions_updated_at BEFORE UPDATE ON ai_actions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
ALTER TABLE ai_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own ai_actions" ON ai_actions FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_ai_actions_user_executed ON ai_actions(user_id, executed_at DESC);

-- =============================================
-- TABLE: ai_insights
-- =============================================
CREATE TABLE IF NOT EXISTS ai_insights (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  insight_type text CHECK (insight_type IN ('warning','opportunity','trend')),
  title text NOT NULL,
  description text,
  priority integer DEFAULT 3,
  is_dismissed boolean DEFAULT false,
  estimated_impact numeric(12,2) DEFAULT 0,
  related_entity text,
  related_entity_id text,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE TRIGGER update_ai_insights_updated_at BEFORE UPDATE ON ai_insights FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own insights" ON ai_insights FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_ai_insights_user_priority ON ai_insights(user_id, priority, is_dismissed);

-- =============================================
-- TABLE: activity_feed
-- =============================================
CREATE TABLE IF NOT EXISTS activity_feed (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  event_type text CHECK (event_type IN ('order','marketing','alert','automation','system')),
  title text NOT NULL,
  description text,
  amount numeric(10,2),
  currency text DEFAULT 'USD',
  icon text,
  color text,
  metadata jsonb,
  occurred_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE activity_feed ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own activity" ON activity_feed FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_activity_feed_user_occurred ON activity_feed(user_id, occurred_at DESC);

-- =============================================
-- SEED DATA — Alex Johnson Demo Account
-- =============================================

-- Profile (uses placeholder UUID — replace with real auth.uid() after first login)
INSERT INTO auth.users (id, email, raw_app_meta_data, raw_user_meta_data, aud, role)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'alex@glowifybeauty.com',
  '{"provider":"email","providers":["email"]}',
  '{}',
  'authenticated',
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO profiles (id, email, full_name, store_name, shopify_domain, plan, plan_status, location, onboarded_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'alex@glowifybeauty.com',
  'Alex Johnson',
  'Glowify Beauty Co.',
  'glowifybeauty.myshopify.com',
  'enterprise',
  'active',
  'Austin, Texas, USA',
  '2024-03-14 09:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Store
INSERT INTO stores (user_id, shopify_domain, store_name, currency, timezone, is_active, last_synced_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'glowifybeauty.myshopify.com',
  'Glowify Beauty Co.',
  'USD',
  'America/Chicago',
  true,
  now()
) ON CONFLICT DO NOTHING;

-- Revenue snapshots (60 days, Mar 14 to May 12 2024)
INSERT INTO revenue_snapshots (user_id, snapshot_date, total_revenue, total_orders, conversion_rate, roas, aov, returning_customer_rate, channel)
SELECT
  '00000000-0000-0000-0000-000000000001',
  ('2024-03-14'::date + (n || ' days')::interval)::date,
  ROUND((3200 + (n::numeric/59)*3600 + sin(n*0.8)*400 + random()*300)::numeric, 2),
  ROUND((45 + (n::numeric/59)*55 + random()*15)::numeric)::integer,
  ROUND((0.028 + random()*0.012)::numeric, 4),
  ROUND((3.8 + random()*1.4)::numeric, 4),
  ROUND((68 + random()*14)::numeric, 2),
  ROUND((0.35 + random()*0.12)::numeric, 4),
  'all'
FROM generate_series(0,59) AS n
ON CONFLICT (user_id, snapshot_date, channel) DO NOTHING;

-- Products
INSERT INTO products (user_id, shopify_product_id, title, product_type, units_sold, total_revenue, avg_rating, margin_percent, total_inventory, status)
VALUES
('00000000-0000-0000-0000-000000000001','SP001','Vitamin C Brightening Serum','Serum',420,37800,4.9,68,12,'active'),
('00000000-0000-0000-0000-000000000001','SP002','Retinol Night Repair Cream','Moisturiser',310,24800,4.7,71,48,'active'),
('00000000-0000-0000-0000-000000000001','SP003','SPF 50 Daily Shield','SPF',280,16800,4.6,58,92,'active'),
('00000000-0000-0000-0000-000000000001','SP004','Peptide Eye Cream','Eye Care',190,15200,4.8,74,31,'active'),
('00000000-0000-0000-0000-000000000001','SP005','Hydrating Rose Toner','Toner',160,9600,4.5,61,0,'active'),
('00000000-0000-0000-0000-000000000001','SP006','AHA/BHA Exfoliant','Exfoliant',140,11200,4.6,66,78,'active'),
('00000000-0000-0000-0000-000000000001','SP007','Niacinamide Pore Serum','Serum',120,8400,4.4,63,18,'active'),
('00000000-0000-0000-0000-000000000001','SP008','Collagen Boost Moisturiser','Moisturiser',98,7840,4.3,69,55,'active')
ON CONFLICT (user_id, shopify_product_id) DO NOTHING;

-- Automations
INSERT INTO automations (user_id, name, automation_type, trigger_condition, is_active, actions_taken, revenue_attributed, last_triggered_at)
VALUES
('00000000-0000-0000-0000-000000000001','Abandoned Cart Recovery','email','Cart abandoned 1h',true,847,31200,now() - interval '12 minutes'),
('00000000-0000-0000-0000-000000000001','Low Stock Alert + PO','inventory','Stock < 20 units',true,14,0,now() - interval '2 hours'),
('00000000-0000-0000-0000-000000000001','VIP Tier Auto-Tag','crm','3rd purchase',true,284,12800,now() - interval '4 hours'),
('00000000-0000-0000-0000-000000000001','Underperforming Ad Pause','paid_ads','ROAS < 2.5x for 24h',true,7,4200,now() - interval '1 day'),
('00000000-0000-0000-0000-000000000001','Post-Purchase Review Request','email','5 days post-delivery',true,1840,0,now() - interval '3 hours'),
('00000000-0000-0000-0000-000000000001','Win-Back Sequence','email','45 days no purchase',true,810,18400,now() - interval '6 hours'),
('00000000-0000-0000-0000-000000000001','Price Match Alert','pricing','Competitor price drop',true,23,0,now() - interval '1 day'),
('00000000-0000-0000-0000-000000000001','New Customer Welcome','email','First purchase',true,1420,7400,now() - interval '8 minutes'),
('00000000-0000-0000-0000-000000000001','Flash Sale Auto-Launch','marketing','Inventory > 200 units',false,3,14800,now() - interval '12 days'),
('00000000-0000-0000-0000-000000000001','Upsell After Purchase','email','Post-checkout',true,640,9200,now() - interval '1 hour')
ON CONFLICT DO NOTHING;

-- AI Actions
INSERT INTO ai_actions (user_id, action_type, title, result, status, revenue_impact, executed_at)
VALUES
('00000000-0000-0000-0000-000000000001','paid_ads','Paused underperforming Facebook Ad Set #7','Saved $340 in wasted spend','completed',340,now() - interval '3 hours'),
('00000000-0000-0000-0000-000000000001','email','Sent win-back campaign to 1840 lapsed customers','$6,200 recovered in 48h','completed',6200,now() - interval '1 day'),
('00000000-0000-0000-0000-000000000001','inventory','Triggered restock PO for Vitamin C Serum','120 units ordered from supplier','completed',0,now() - interval '1 day 2 hours'),
('00000000-0000-0000-0000-000000000001','paid_ads','Scaled Google Shopping budget +30%','ROAS at 5.2x, within target','completed',4200,now() - interval '3 days'),
('00000000-0000-0000-0000-000000000001','system','Detected mobile checkout bug on Safari','Flagged for dev team, ticket #1094','running',0,now() - interval '4 days'),
('00000000-0000-0000-0000-000000000001','email','Launched Flash Sale to VIP segment','41% open rate, $14,800 GMV','completed',14800,now() - interval '5 days'),
('00000000-0000-0000-0000-000000000001','marketing','A/B test on PDP hero image started','Variant B winning by 12% CTR','running',0,now() - interval '7 days'),
('00000000-0000-0000-0000-000000000001','pricing','Auto-repriced 14 SKUs vs competitors','Avg margin +2.3%','completed',2100,now() - interval '9 days')
ON CONFLICT DO NOTHING;

-- Campaigns
INSERT INTO campaigns (user_id, platform, campaign_name, status, budget_daily, total_spent, roas, ctr, open_rate)
VALUES
('00000000-0000-0000-0000-000000000001','meta','Spring Glow Sale','active',200,1840,3.8,0.021,0),
('00000000-0000-0000-0000-000000000001','meta','Retinol Awareness','underperforming',80,740,2.9,0.014,0),
('00000000-0000-0000-0000-000000000001','google','Google Shopping — Serums','active',150,1380,5.6,0.038,0),
('00000000-0000-0000-0000-000000000001','google','Google Brand Search','active',60,540,6.1,0.082,0),
('00000000-0000-0000-0000-000000000001','klaviyo','VIP Win-Back Email','completed',null,0,0,0,0.44),
('00000000-0000-0000-0000-000000000001','klaviyo','Flash Sale Blast','completed',null,0,0,0,0.38)
ON CONFLICT DO NOTHING;

-- AI Insights
INSERT INTO ai_insights (user_id, insight_type, title, description, priority, estimated_impact)
VALUES
('00000000-0000-0000-0000-000000000001','warning','Ad Frequency Too High','Facebook ad frequency hit 4.8x for your core audience. Creative fatigue likely. Rotate new ad sets within 48h.',1,1600),
('00000000-0000-0000-0000-000000000001','opportunity','Bundle Upsell Untapped','67% of Vitamin C buyers also view Retinol but do not convert. A bundle offer could recover $12K/month.',2,12000),
('00000000-0000-0000-0000-000000000001','trend','Mobile Revenue Up 28%','Mobile now drives 61% of orders. Consider mobile-first campaign creatives.',3,0)
ON CONFLICT DO NOTHING;

-- Activity Feed
INSERT INTO activity_feed (user_id, event_type, title, amount, occurred_at)
VALUES
('00000000-0000-0000-0000-000000000001','order','Order #8821 — New York, US',142,now() - interval '1 minute'),
('00000000-0000-0000-0000-000000000001','order','Order #8820 — London, UK',89,now() - interval '3 minutes'),
('00000000-0000-0000-0000-000000000001','marketing','Flash Sale email sent to 4,200 subscribers',null,now() - interval '8 minutes'),
('00000000-0000-0000-0000-000000000001','alert','Stock alert: Retinol Cream below 20 units',null,now() - interval '12 minutes'),
('00000000-0000-0000-0000-000000000001','order','Order #8819 — Toronto, CA',210,now() - interval '14 minutes'),
('00000000-0000-0000-0000-000000000001','marketing','Facebook Campaign #3 spend hit daily cap',null,now() - interval '22 minutes'),
('00000000-0000-0000-0000-000000000001','order','Order #8818 — Sydney, AU',67,now() - interval '28 minutes'),
('00000000-0000-0000-0000-000000000001','automation','Abandoned cart recovery — $340 recovered',340,now() - interval '35 minutes'),
('00000000-0000-0000-0000-000000000001','alert','Conversion drop detected on /collections/skincare',null,now() - interval '41 minutes'),
('00000000-0000-0000-0000-000000000001','order','Order #8817 — Chicago, US',189,now() - interval '47 minutes'),
('00000000-0000-0000-0000-000000000001','marketing','Google Shopping ROAS reached 5.2x',null,now() - interval '1 hour'),
('00000000-0000-0000-0000-000000000001','order','Order #8816 — Berlin, DE',93,now() - interval '1 hour 10 minutes')
ON CONFLICT DO NOTHING;
