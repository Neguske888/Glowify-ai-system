-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Tenants
create table tenants (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Users linked to tenants
create table profiles (
  id uuid primary key references auth.users(id),
  tenant_id uuid not null references tenants(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Stores
create table stores (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  shopify_domain text not null,
  access_token text not null,
  settings jsonb default '{}'::jsonb,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders
create table orders (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references stores(id) on delete cascade,
  shopify_order_id text not null,
  total_price numeric not null,
  currency text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- AI Decisions
create table ai_decisions (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references stores(id) on delete cascade,
  action_type text not null,
  impact_score numeric,
  suggestion jsonb not null,
  status text default 'pending', -- pending, approved, rejected, executed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Automation Logs
create table automation_logs (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references stores(id) on delete cascade,
  event_type text not null,
  details jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table tenants enable row level security;
alter table profiles enable row level security;
alter table stores enable row level security;
alter table orders enable row level security;
alter table ai_decisions enable row level security;
alter table automation_logs enable row level security;

create policy "Users can view their tenant" on tenants for select using (id in (select tenant_id from profiles where id = auth.uid()));
create policy "Users can view their profile" on profiles for select using (id = auth.uid());
create policy "Users can view their store" on stores for select using (tenant_id in (select tenant_id from profiles where id = auth.uid()));
create policy "Users can view their orders" on orders for select using (store_id in (select id from stores where tenant_id in (select tenant_id from profiles where id = auth.uid())));
create policy "Users can view their ai_decisions" on ai_decisions for select using (store_id in (select id from stores where tenant_id in (select tenant_id from profiles where id = auth.uid())));
create policy "Users can view their automation_logs" on automation_logs for select using (store_id in (select id from stores where tenant_id in (select tenant_id from profiles where id = auth.uid())));
