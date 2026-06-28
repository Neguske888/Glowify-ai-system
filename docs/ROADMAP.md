# Roadmap

This roadmap follows the agreed direction: canonical `/src` frontend, tenant-first architecture, and provider-agnostic AI.

## Phase 1

- Freeze the canonical frontend in `/src`
- Stop new feature work in duplicate frontend trees
- Define the shared contracts for AI, data, and integrations
- Document tenant and ownership rules
- Create the base engineering docs set

## Phase 2

- Separate frontend, API, worker, and integration responsibilities
- Consolidate duplicate business logic into shared packages
- Standardize tenant-scoped data access
- Introduce stable AI provider abstraction
- Formalize webhook and queue processing boundaries

## Phase 3

- Expand multi-tenant capabilities for multiple businesses per deployment
- Add stronger observability and operational controls
- Harden automation approval and execution flows
- Improve outcome tracking and learning loops
- Prepare platform surfaces for admin and operational tooling

## Phase 4

- Add additional integration surfaces as dedicated modules
- Scale worker and scheduler execution patterns
- Mature billing, notifications, and analytics as first-class packages
- Continue reducing coupling between product surfaces and infrastructure
