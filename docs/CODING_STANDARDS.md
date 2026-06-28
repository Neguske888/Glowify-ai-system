# Coding Standards

These standards define how Glowify AI code should be written as the platform moves toward production.

## Core Standards

- Use TypeScript for shared and server-side code.
- Keep components focused and composable.
- Prefer explicit contracts over implicit data shape assumptions.
- Keep tenant context available in every business operation.
- Keep business logic separate from presentation logic.

## AI Standards

- AI code must be provider-agnostic.
- Prompting, provider calls, and response validation must be separated.
- AI actions must be traceable and testable.
- Every AI decision should be linked to an observable business outcome.

## Integration Standards

- Never expose vendor secrets in browser code.
- Validate inbound webhooks before processing them.
- Normalize integration data before it reaches business logic.
- Keep vendor-specific code behind a dedicated adapter boundary.

## Data Standards

- Every persistent business record must include tenant scope.
- Use consistent naming for tenant identifiers and timestamps.
- Avoid duplicating schema shapes across files.
- Prefer a single source of truth for entity definitions.

## Maintainability Rules

- Avoid oversized components and services.
- Avoid duplicated logic across app trees.
- Keep modules small enough to test in isolation.
- Add concise comments only where intent is not obvious.
