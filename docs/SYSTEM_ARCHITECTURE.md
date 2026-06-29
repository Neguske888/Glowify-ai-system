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

## Bootstrap Layer and Composition Root

The platform bootstrap layer lives in `packages/bootstrap` and acts as the single composition root for platform contracts.

- It wires together infrastructure, integrations, secret management, and backend contracts through in-memory orchestration.
- It owns startup, shutdown, registration, validation, diagnostics, and health aggregation.
- It remains provider-agnostic and does not initialize vendor SDKs, persistence layers, or runtime integrations.
- It exposes metadata and lifecycle state only, not business logic or implementation details.

## Observability Layer

The observability layer lives in `packages/observability` and defines provider-agnostic contracts for logging, metrics, tracing, auditing, diagnostics, health reporting, and related event models.

- It exposes metadata and contracts only.
- It does not initialize vendor SDKs or publish to external systems.
- It is designed to be consumed by infrastructure, bootstrap, and backend contracts without binding the platform to a specific observability stack.

## Event Bus Layer

The event bus layer lives in `packages/events` and defines provider-agnostic contracts for event publishing, subscription, dispatch, routing, retry, dead-letter handling, serialization, and middleware composition.

- It models message metadata, delivery semantics, and registry state only.
- It does not bind to brokers, queues, streams, SDKs, persistence, or networking.
- It is intended to be consumed by bootstrap, infrastructure, and backend composition without introducing runtime implementations.

## Workflow Engine Layer

The workflow engine layer lives in `packages/workflows` and defines provider-agnostic contracts for workflow orchestration, execution, scheduling, state management, triggers, actions, conditions, retries, middleware, checkpoints, and compensation.

- It expresses lifecycle and execution semantics without selecting a workflow engine or SDK.
- It does not introduce persistence, networking, queues, or runtime implementations.
- It is intended to compose with the event, observability, bootstrap, and infrastructure layers through contracts only.

## Domain Layer

The domain layer lives in `packages/domain` and contains the pure model contracts for entities, value objects, aggregate roots, repositories, specifications, domain events, unit of work, commands, queries, validation, and domain errors.

- It provides reusable concepts such as tenant ownership, timestamps, versioning, soft delete, optimistic concurrency, and audit metadata.
- It depends on no runtime provider, persistence engine, SDK, or infrastructure implementation.
- It is consumed by bootstrap, infrastructure, workflows, events, observability, and integrations as a stable contract surface.

## CQRS Layer

The CQRS layer lives in `packages/cqrs` and defines provider-agnostic contracts for commands, queries, buses, handlers, dispatchers, execution contexts, middleware behaviors, validation, authorization, retry, idempotency, and result models.

- It composes with the domain layer as the request/response boundary for application use cases.
- It can publish or react to events through the events layer without embedding transport or broker assumptions.
- It relies on bootstrap and infrastructure for composition and cross-cutting concerns, while observability captures metadata and execution signals.
- It remains implementation-free and does not depend on workflows, integrations, persistence, or runtime providers.

## Authorization Layer

The authorization layer lives in `packages/authorization` and defines provider-agnostic contracts for permissions, roles, policies, scopes, principals, resources, access decisions, and authorization results.

- It supports RBAC, ABAC, inherited permissions, wildcard permissions, delegated administration, and feature-gated access rules.
- It composes with the domain layer for resource and tenant semantics, with CQRS for request evaluation boundaries, and with bootstrap and infrastructure for composition and policy resolution.
- It can consume events, workflows, and observability metadata without depending on any authentication provider, storage engine, or middleware runtime.

## Configuration Layer

The configuration layer lives in `packages/configuration` and defines provider-agnostic contracts for configuration sources, providers, repositories, stores, resolvers, validators, schemas, snapshots, feature flags, and runtime configuration metadata.

- It supports scoped configuration across global, tenant, organization, team, user, and environment boundaries.
- It supports feature-flag strategies such as boolean, percentage rollout, allow/deny lists, role-based, permission-based, tenant-based, organization-based, and custom rules.
- It composes with authorization and CQRS for policy-aware resolution, with domain for tenant and identity semantics, and with bootstrap, events, workflows, infrastructure, and observability as a contract-only platform layer.
- It remains implementation-free and does not depend on any storage engine, SDK, or runtime provider.

## Notifications Layer

The notifications layer lives in `packages/notifications` and defines provider-agnostic contracts for notification services, providers, repositories, templates, delivery tracking, preferences, subscriptions, queues, schedulers, and renderers.

- It supports multi-channel communication across email, SMS, push, WhatsApp, in-app, webhook, Slack, Discord, Microsoft Teams, and custom channels.
- It models metadata, delivery states, template localization, and preference rules without implementing any transport or provider logic.
- It composes with domain, CQRS, authorization, bootstrap, infrastructure, events, workflows, and observability as a contract-only surface.

## Search & Indexing Layer

The search and indexing layer lives in `packages/search` and defines provider-agnostic contracts for documents, queries, filters, sorting, facets, aggregations, highlights, suggestions, analyzers, tokenizers, repositories, providers, services, and registries.

- It models full-text, exact match, fuzzy, prefix, autocomplete, wildcard, phrase, semantic, vector, and hybrid search as capabilities only.
- It captures document and query metadata, scoring, pagination, and result explanation contracts without binding to any search engine or vector store.
- It composes with domain, CQRS, bootstrap, infrastructure, events, workflows, and observability as a contract-only platform surface.

## Storage Layer

The storage layer lives in `packages/storage` and defines provider-agnostic contracts for storage objects, buckets, providers, repositories, services, upload and download strategies, lifecycle, versioning, retention, encryption, checksums, access policy, signed URLs, multipart uploads, thumbnails, transformations, and registries.

- It models object metadata, lifecycle state, visibility, locking, virus scan metadata, moderation metadata, and storage operations without binding to any storage backend or SDK.
- It supports single, multipart, resumable, and streaming upload strategies, with streaming, range, and partial download as contract-only capabilities.
- It composes with domain, CQRS, bootstrap, infrastructure, events, workflows, and observability as a contract-only platform surface.


## Billing & Subscription Layer

The billing layer lives in `packages/billing` and defines provider-agnostic contracts for billing accounts, plans, subscriptions, invoices, payments, usage metering, entitlements, pricing, discounts, coupons, taxes, credits, refunds, trials, checkout, webhook handling, registries, repositories, services, and errors.

- It models billing metadata, lifecycle state, and contract surfaces only.
- It does not implement runtime behavior, persistence, networking, or payment provider integrations.

## AI Agent Framework Layer

The AI agent framework layer lives in `packages/agents` and defines provider-agnostic contracts for agents, lifecycle state, planning, reasoning, execution, tasks, tools, memory, knowledge, sessions, conversations, collaboration, orchestration, coordination, evaluation, feedback, reflection, policies, registries, repositories, and services.

- It models agent behavior and coordination metadata only.
- It does not introduce runtime implementations, provider SDKs, networking, persistence, authentication, or business logic.
- It is intended to compose with CQRS, workflows, events, observability, bootstrap, and domain contracts without binding the platform to a specific AI runtime.

## Plugin & Extension Framework Layer

The plugin and extension framework layer lives in `packages/extensions` and defines provider-agnostic contracts for extensions, plugins, modules, manifests, metadata, capabilities, discovery, registration, catalogs, installation, activation, deactivation, lifecycle events, hooks, middleware, interceptors, configuration, settings, permissions, security, sandboxing, repositories, and services.

- It models extension metadata, compatibility, dependency declarations, and lifecycle state only.
- It does not introduce runtime loading, dynamic imports, networking, persistence, filesystem operations, SDKs, or business logic.
- It is intended to compose with bootstrap, domain, CQRS, workflows, events, observability, and infrastructure contracts without binding the platform to a specific plugin runtime.

## Orchestration Layer

The orchestration layer lives in `packages/orchestration` and defines provider-agnostic contracts for orchestration, execution metadata, execution plans and results, policies, commands, tasks, pipelines, stages, approvals, checkpoints, compensation, rollback, retry, timeout, routing, coordination, middleware, interceptors, lifecycle state, events, metrics, diagnostics, repositories, and services.

- It models orchestration identifiers, execution state transitions, approval state, policy metadata, timestamps, and versioning only.
- It does not introduce runtime orchestration logic, networking, persistence, queues, schedulers, filesystem access, SDKs, or business logic.
- It is intended to compose with bootstrap, infrastructure, domain, workflows, events, CQRS, observability, authorization, configuration, AI, notifications, and extensions through contracts only.

## Governance Layer

The governance layer lives in `packages/governance` and defines provider-agnostic contracts for policies, policy sets, policy evaluation, compliance, audit, risk, classification, retention, consent, privacy, residency, encryption, key policy, data access, data sharing, AI governance, moderation, safety, trust, approvals, exceptions, reviews, registries, repositories, services, and lifecycle state.

- It models governance identifiers, compliance frameworks, approval state, audit metadata, risk scores, trust levels, effective dates, timestamps, and versioning only.
- It does not introduce runtime enforcement, persistence, networking, filesystem access, SDKs, middleware implementations, or business logic.
- It is intended to compose with domain, orchestration, workflows, events, CQRS, authorization, configuration, observability, notifications, storage, billing, AI, extensions, and bootstrap through contracts only.

## Authentication & Identity Layer

The authentication and identity layer lives in `packages/authentication` and defines provider-agnostic contracts for identity, users, accounts, profiles, sessions, devices, credentials, password policies, verification, MFA, passkeys, WebAuthn, OAuth, OIDC, SAML, social login, magic links, API keys, service accounts, tenants, organizations, memberships, invitations, impersonation, security events, login attempts, lockout, rate limiting, risk, trust scores, recovery, audit metadata, registries, repositories, services, and lifecycle state.

- It models identity metadata, authentication state, verification state, provider metadata, and recovery metadata only.
- It does not introduce runtime authentication logic, persistence, networking, cookies, sessions, cryptographic implementation, middleware, or SDK integrations.
- It is intended to compose with domain, orchestration, workflows, events, CQRS, authorization, configuration, observability, notifications, storage, billing, AI, extensions, and bootstrap through contracts only.

## AI Runtime Layer

The AI runtime layer lives in `packages/ai-runtime` and defines provider-agnostic contracts for AI providers, models, chat, completion, embedding, image, audio, video, prompts, conversations, context windows, memory, tool calling, function calling, agent sessions, reasoning, planning, streaming metadata, responses, usage, token accounting, cost tracking, safety, moderation, routing, fallback, load balancing, caching, evaluation, benchmark, telemetry, repositories, services, and registry state.

- It models model families, model capabilities, prompt versions, conversation metadata, token accounting, cost metadata, routing strategies, and safety state only.
- It does not introduce runtime execution, provider SDKs, networking, HTTP clients, persistence, AI inference, prompt execution, or streaming implementation.
- It is intended to compose with orchestration, agents, workflows, events, CQRS, observability, configuration, governance, extensions, bootstrap, and domain contracts through metadata-only interfaces.

## Adapter Layer

The adapter layer lives in `packages/adapters` and defines provider-agnostic contracts for adapters, providers, connectors, registries, factories, bindings, mappings, translation, serialization, configuration, health, diagnostics, versioning, compatibility, dependencies, features, repositories, and services.

- It models adapter metadata, provider metadata, connector metadata, lifecycle state, compatibility state, and feature discovery only.
- It does not introduce runtime logic, SDK implementations, networking, persistence, filesystem operations, authentication logic, or vendor-specific assumptions.
- It is intended to compose with bootstrap, domain, orchestration, workflows, events, CQRS, authorization, configuration, observability, AI, notifications, storage, billing, extensions, and governance through contracts only.

## SDK Layer

The SDK layer lives in `packages/sdk` and defines provider-agnostic contracts for SDKs, clients, factories, configuration, context, requests, responses, endpoints, operations, transport, middleware, interceptors, serialization, deserialization, pagination, retry, timeout, authentication, authorization, caching, telemetry, diagnostics, versioning, compatibility, registries, repositories, and services.

- It models SDK metadata, client metadata, request and response metadata, endpoint metadata, operation metadata, transport metadata, and compatibility state only.
- It does not introduce runtime logic, networking, persistence, filesystem access, HTTP implementation, transport implementation, or vendor-specific assumptions.
- It is intended to compose with bootstrap, domain, orchestration, workflows, events, CQRS, authorization, configuration, observability, AI, notifications, storage, billing, extensions, governance, adapters, and authentication through contracts only.
