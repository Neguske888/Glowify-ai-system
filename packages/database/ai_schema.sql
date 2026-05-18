-- AI Insights Schema
CREATE TYPE insight_status AS ENUM ('pending', 'approved', 'executed', 'dismissed');

CREATE TABLE ai_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    priority INTEGER NOT NULL DEFAULT 1, -- 1 (High) to 5 (Low)
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    impact_estimate DECIMAL(12, 2), -- Estimated revenue impact
    recommendation TEXT NOT NULL,
    automation_action JSONB, -- Defines the executable logic
    status insight_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_insights_tenant_id_status ON ai_insights(tenant_id, status);
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation_policy ON ai_insights FOR ALL USING (tenant_id = (current_setting('app.current_tenant_id'))::uuid);
