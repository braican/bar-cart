## Plan: Bar Cart Product + Design Foundation

Build Bar Cart with Next.js App Router + TypeScript, PocketBase-backed auth/data, and an incremental feature roadmap that includes design iteration from day one. The visual direction is modern, minimal, high-class cocktail-menu inspired, with serif-led typography, strong whitespace, dual-theme support, one bold accent (deep emerald), and subtle motion.

**Steps**

1. Phase 1: Architecture and delivery guardrails
2. Lock framework to Next.js App Router with TypeScript strict mode for long-term scale and full-stack flexibility.
3. Set dependency policy: platform-first defaults, third-party packages only with explicit rationale and alternatives.
4. Keep runtime simple: Next.js frontend + route handlers, PocketBase as system of record, no Go/Rust service in initial scope.
5. Define AI reliability policy: conversational layer uses low-cost model, but cocktail recommendations must be grounded by canonical recipe records to avoid hallucinated recipes. _blocks final AI UX contract_

6. Phase 2: Product, requirements, and design docs
7. Write product spec documenting goals, personas, MVP features, future enhancements, and explicit non-goals.
8. Write requirements doc with acceptance criteria for auth, inventory CRUD, AI bartender, favorites, and PWA baseline.
9. Write technical design doc covering architecture, route map, auth/session lifecycle, data contracts, and AI orchestration/cost controls.
10. Write UI design brief/design-system starter documenting typography, spacing, color tokens, component style principles, light/dark behavior, and motion constraints.
11. Add agent workflow agreement: incremental slices only, no autonomous git commits, and dependency review at each slice.

12. Phase 3: Incremental implementation slices
13. Slice A (foundation): scaffold app, environment contract, PocketBase client wrapper, base layout, theme tokens, and typographic primitives.
14. Slice B (auth): Google OAuth login/logout with PocketBase, protected app shell, and auth error/recovery states.
15. Slice C (inventory): inventory data model + add/edit/delete/list flows with clean form UX and validation.
16. Slice D (favorites): favorite recipe persistence and management views.
17. Slice E (AI bartender MVP): chat interface, server route for model calls, inventory-aware context assembly, and response guardrails.
18. Slice F (PWA MVP): installability, manifest, icons, theme-color handling, and minimal offline shell behavior.
19. Slice G (hardening): accessibility audits, test coverage, perf checks, and AI spend/rate controls.

20. Phase 4: Design iteration loop (runs across slices)
21. For each slice, run a design checkpoint before code merge: spacing rhythm, typography hierarchy, contrast checks, and theme parity.
22. Keep visual style modern and restrained (no retro prohibition-era motifs), preserving editorial premium tone.
23. Validate dark/light token parity and ensure accent usage remains sparse and intentional.
24. Add a lightweight UI review checklist to prevent visual drift as features expand.

25. Phase 5: Verification and release readiness
26. Define per-slice validation: manual user journeys + targeted automated tests.
27. Include dependency audit at each slice boundary: what was added, why, and rejected alternatives.
28. Add Netlify deployment checklist: env validation, OAuth redirect validation, and PWA install checks.

**Relevant files**

- /Users/braican/Projects/braican/bar-cart/README.md — expand with project overview, setup, architecture summary, and links to docs.
- /Users/braican/Projects/braican/bar-cart/.gitignore — expand for Next.js/Node outputs and local tooling artifacts.
- /Users/braican/Projects/braican/bar-cart/.env — define frontend/server env contract (PocketBase URL, AI provider keys, app URL).
- /Users/braican/Projects/braican/bar-cart/docs/spec.md — source of truth for product scope and milestones.
- /Users/braican/Projects/braican/bar-cart/docs/requirements.md — acceptance-criteria-centric requirements.
- /Users/braican/Projects/braican/bar-cart/docs/design.md — architecture and integration design.
- /Users/braican/Projects/braican/bar-cart/docs/ui-design-brief.md — visual language and design-system guidance.

**Verification**

1. Confirm plan satisfies constraints: scalable framework, incremental delivery, no auto-commit, minimal dependencies.
2. Trace every MVP feature to measurable acceptance criteria.
3. Confirm design guidance covers typography, whitespace, modern tone, dual-theme, accessible contrast, and accent discipline.
4. Confirm implementation slices are independently testable and demoable.

**Decisions**

- Framework: Next.js + TypeScript.
- Deployment target: Netlify.
- PWA timing: MVP.
- AI timing: MVP with low-cost-first provider strategy.
- Visual direction: high-class modern minimal, serif-led hierarchy, deep emerald accent, subtle motion.
- Font sourcing: webfont CDN in initial phase (accepted tradeoff: one external dependency for faster iteration).
- Excluded from current scope: social/friends feed and public cabinet showcase.
- Language strategy: TypeScript-first; revisit Go/Rust only when clear bottlenecks emerge.

**Further Considerations**

1. Recipe grounding recommendation: maintain canonical cocktail recipes in PocketBase and enforce retrieval grounding before AI response generation.
2. Cost control recommendation: token caps, short system prompts, and response length controls from day one.
3. Font dependency review recommendation: after visual baseline stabilizes, evaluate moving from CDN to self-hosted fonts to reduce external runtime dependency.

**Next Pass Output (Completed)**

1. Product spec v0.1 drafted and stored in session memory at /memories/session/spec-draft.md.
2. Next planning pass should produce requirements.md and design.md drafts with explicit PocketBase schema and route-level contracts.
