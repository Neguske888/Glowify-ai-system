# Repository Structure

This repository should be interpreted through the canonical production frontend in `/src` and the supporting packages around it.

## Canonical Areas

- `/src` - production frontend application
- `/packages/database` - tenant-aware persistence and schema definitions
- `/packages/ai` - AI analysis, evaluation, observability, and execution primitives
- `/packages/worker` - background job execution and queue management
- `/docs` - product, architecture, and engineering documentation

## What Belongs In `/src`

- UI screens and layout components
- client-side application state
- browser-safe data access
- presentation logic

## What Belongs Outside `/src`

- database clients and migrations
- AI provider integrations
- webhook processing
- queue workers
- server-side secret handling

## Structural Rules

- Keep the canonical frontend in one place.
- Do not introduce duplicate frontend trees for new work.
- Keep server concerns out of browser modules.
- Keep shared contracts in packages, not copied into app trees.
