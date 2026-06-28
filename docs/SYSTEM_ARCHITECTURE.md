# System Architecture

Glowify AI is being organized around a canonical frontend plus supporting backend and platform services. The architecture should favor clear boundaries, tenant isolation, and modular AI execution.

## Current Architectural Direction

- Canonical frontend: `/src`
- Core requirement: multi-tenant SaaS
- AI layer: provider-agnostic and testable
- Business logic: outcome-driven and tenant-scoped

## Architectural Boundaries

- Frontend owns presentation and user interaction only.
- API layer owns authentication, validation, and orchestration.
- Worker layer owns asynchronous execution, retries, and scheduled jobs.
- Database layer owns tenant-scoped persistence and policy enforcement.
- Integration layer owns vendor communication and secret handling.

## Required System Properties

- Every business record must be tenant-scoped.
- Every automated action must be traceable.
- AI providers must be swappable behind a stable interface.
- Integrations must not expose secrets to the browser.
- Execution paths must be safe to retry and easy to observe.

## Service Contracts

### AI Service
- Responsibility: Generate insights, draft content, and evaluate outcomes through a provider-agnostic AI interface.
- Public methods: `analyze`, `generate`, `evaluate`, `score`, `summarize`.
- Inputs: tenant context, business data, prompt or task payload, provider preferences, execution metadata.
- Outputs: structured AI result, confidence/priority, trace metadata, error payload.
- Error handling: return typed failures, classify provider/timeouts/validation errors, never expose raw provider responses to clients.
- Authentication requirements: authenticated backend caller only.
- Tenant requirements: mandatory `tenant_id` on every request and trace.
- Dependencies: AI provider adapters, observability, database, queue/workflow orchestration.

### Billing Service
- Responsibility: Validate plans, enforce usage limits, manage subscriptions, and expose billing state.
- Public methods: `validateSubscription`, `getPlanLimits`, `recordUsage`, `syncSubscription`, `handleBillingEvent`.
- Inputs: tenant context, subscription state, usage counters, billing event payloads.
- Outputs: entitlement decision, plan metadata, usage status, billing event result.
- Error handling: fail closed on unknown or expired state, surface typed billing errors, never trust client-submitted plan status.
- Authentication requirements: authenticated backend caller; payment-provider webhooks verified server-side.
- Tenant requirements: tenant-scoped subscription state and usage accounting.
- Dependencies: Stripe or future billing provider adapter, database, webhook gateway, observability.

### Shopify Service
- Responsibility: Sync Shopify data, verify Shopify webhooks, and execute Shopify-side operations.
- Public methods: `verifyWebhook`, `syncStore`, `syncProducts`, `syncOrders`, `syncCustomers`, `applyStoreUpdate`.
- Inputs: tenant context, shop domain, webhook payloads, sync cursor/state, action requests.
- Outputs: normalized commerce data, sync status, operation result, audit trail.
- Error handling: reject invalid signatures, treat duplicate deliveries as idempotent, classify sync failures separately from provider errors.
- Authentication requirements: backend-only with webhook signature validation and server-side store credentials.
- Tenant requirements: store-to-tenant mapping required for every request.
- Dependencies: Shopify SDK or API adapter, database, queue worker, observability.

### Notification Service
- Responsibility: Send user-facing notifications by email, push, SMS, or internal message channels.
- Public methods: `send`, `queue`, `renderTemplate`, `trackDelivery`, `subscribeChannel`.
- Inputs: tenant context, recipient identity, notification type, template data, channel preferences.
- Outputs: delivery status, message id, retry state, delivery receipt.
- Error handling: retry transient failures, classify permanent delivery errors, do not leak provider internals to clients.
- Authentication requirements: backend-only, with outbound provider credentials kept server-side.
- Tenant requirements: recipient and template resolution must be tenant-scoped.
- Dependencies: email/SMS/push provider adapters, queue system, database, observability.

### Webhook Gateway
- Responsibility: Receive, verify, normalize, and route inbound third-party webhooks.
- Public methods: `verify`, `parse`, `dedupe`, `route`, `acknowledge`.
- Inputs: raw HTTP request, provider headers, body bytes, tenant/store identifiers.
- Outputs: normalized event envelope, routing decision, acknowledgement response.
- Error handling: reject invalid signatures, enforce idempotency, return safe generic errors, never expose raw secrets.
- Authentication requirements: provider signature verification plus service-level route protection where applicable.
- Tenant requirements: every event must resolve to a tenant before downstream processing.
- Dependencies: secret management service, queue system, database, integration adapters, observability.

### Secret Management Service
- Responsibility: Store, encrypt, retrieve, rotate, and revoke secrets used by backend integrations.
- Public methods: `storeSecret`, `getSecret`, `rotateSecret`, `revokeSecret`, `listSecretMetadata`.
- Inputs: tenant context, secret name, encrypted payload, rotation policy, access reason.
- Outputs: secret reference, rotation result, revocation status, metadata only.
- Error handling: deny access on missing authorization, never return raw secret values to clients, fail closed on decryption or policy errors.
- Authentication requirements: backend-only with privileged service authentication.
- Tenant requirements: secrets must be isolated per tenant and per integration scope.
- Dependencies: encryption key management, database or vault backend, audit logging, observability.

## Architectural Rules

1. UI never communicates directly with external providers.
2. All vendor SDKs execute server-side.
3. API keys are stored encrypted.
4. Secrets are never returned to clients.
5. Every request carries tenant context.
6. Every service exposes a provider-agnostic interface.
7. Business logic never depends on a specific vendor SDK.

## Design Rules

- Prefer one canonical implementation per concern.
- Keep shared contracts explicit.
- Avoid duplicated schema definitions.
- Avoid cross-layer coupling that bypasses the API boundary.
- Treat business outcome metrics as the source of truth for AI and automation quality.
