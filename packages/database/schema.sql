-- Enum Types
CREATE TYPE user_role AS ENUM ('owner', 'admin', 'staff');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'completed', 'cancelled');
CREATE TYPE campaign_status AS ENUM ('draft', 'active', 'paused', 'ended');

-- Table: tenants
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role user_role DEFAULT 'staff',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id, email)
);

-- Table: stores
CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    status order_status DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: campaigns
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    status campaign_status DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: ai_decisions
CREATE TABLE ai_decisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    decision_type TEXT NOT NULL,
    confidence_score DECIMAL(5, 4),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: automation_logs
CREATE TABLE automation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_tenant_id ON users(tenant_id);
CREATE INDEX idx_stores_tenant_id ON stores(tenant_id);
CREATE INDEX idx_products_tenant_id_store_id ON products(tenant_id, store_id);
CREATE INDEX idx_orders_tenant_id_store_id ON orders(tenant_id, store_id);
CREATE INDEX idx_campaigns_tenant_id ON campaigns(tenant_id);
CREATE INDEX idx_ai_decisions_tenant_id ON ai_decisions(tenant_id);
CREATE INDEX idx_automation_logs_tenant_id ON automation_logs(tenant_id);

-- Enable RLS
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Assuming auth.uid() and JWT tenant_id mapping)
CREATE POLICY tenant_isolation_policy ON tenants FOR ALL USING (id = (current_setting('app.current_tenant_id'))::uuid);
CREATE POLICY tenant_isolation_policy ON users FOR ALL USING (tenant_id = (current_setting('app.current_tenant_id'))::uuid);
CREATE POLICY tenant_isolation_policy ON stores FOR ALL USING (tenant_id = (current_setting('app.current_tenant_id'))::uuid);
CREATE POLICY tenant_isolation_policy ON products FOR ALL USING (tenant_id = (current_setting('app.current_tenant_id'))::uuid);
CREATE POLICY tenant_isolation_policy ON orders FOR ALL USING (tenant_id = (current_setting('app.current_tenant_id'))::uuid);
CREATE POLICY tenant_isolation_policy ON campaigns FOR ALL USING (tenant_id = (current_setting('app.current_tenant_id'))::uuid);
CREATE POLICY tenant_isolation_policy ON ai_decisions FOR ALL USING (tenant_id = (current_setting('app.current_tenant_id'))::uuid);
CREATE POLICY tenant_isolation_policy ON automation_logs FOR ALL USING (tenant_id = (current_setting('app.current_tenant_id'))::uuid);
