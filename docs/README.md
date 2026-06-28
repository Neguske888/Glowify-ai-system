# Glowify AI Documentation

Glowify AI is an AI Business Operating System for multi-tenant commerce and operations. This documentation set defines the product direction, system boundaries, repository structure, coding expectations, and roadmap for the canonical application.

## Canonical Decisions

- `/src` is the canonical frontend.
- Multi-tenancy is a first-class requirement.
- AI must remain provider-agnostic.
- Features are judged by business outcome, not by isolated tooling value.

## Document Index

- [`PRODUCT_VISION.md`](./PRODUCT_VISION.md)
- [`SYSTEM_ARCHITECTURE.md`](./SYSTEM_ARCHITECTURE.md)
- [`REPOSITORY_STRUCTURE.md`](./REPOSITORY_STRUCTURE.md)
- [`CODING_STANDARDS.md`](./CODING_STANDARDS.md)
- [`ROADMAP.md`](./ROADMAP.md)

## How To Use These Docs

- Read `PRODUCT_VISION.md` before making product or UX decisions.
- Read `SYSTEM_ARCHITECTURE.md` before introducing new services, packages, or integrations.
- Read `REPOSITORY_STRUCTURE.md` before adding files or relocating code.
- Read `CODING_STANDARDS.md` before modifying implementation details.
- Read `ROADMAP.md` before planning phase work.
