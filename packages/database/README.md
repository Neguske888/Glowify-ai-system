# Database Architecture: Glowify AI

## Overview
This architecture uses a **Discriminator Column (Multi-tenant)** approach where every table includes a `tenant_id` foreign key. Data isolation is enforced at the database level using PostgreSQL **Row Level Security (RLS)**.

## Multi-tenant Design
- **Tenant Isolation:** Every record is scoped to a specific `tenant_id`.
- **Row Level Security:** RLS policies ensure that queries executed by a user only return data belonging to their associated `tenant_id`.
- **Context Injection:** When connecting to the DB, the application should execute `SET app.current_tenant_id = '...'` to set the tenant context for the session.

## Schema Details
- **Tables:** All tables are mapped to a central `tenants` table.
- **Relationships:** Uses `ON DELETE CASCADE` to ensure data cleanliness if a tenant or parent entity is removed.
- **Indexing:** Composite indexes on `(tenant_id, ...)` are used on all high-traffic tables to optimize cross-tenant query performance.

## Migrations & Deployment
- Use `prisma migrate dev` to generate migrations.
- Ensure the `PostgreSQL` instance has `pgcrypto` enabled for `gen_random_uuid()`.
- RLS policies should be applied during initial setup or via a custom migration after tables are created.
