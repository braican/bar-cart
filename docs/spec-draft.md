# Bar Cart Product Specification (v0.1)

## 1. Purpose

Bar Cart is a personal bartender web application that helps users track what bottles they own, discover cocktails they can make, and save favorite recipes. The product should feel premium and modern, with a minimal interface inspired by contemporary cocktail menus.

## 2. Product Goals

1. Make home cocktail decision-making fast and personalized.
2. Reduce friction in maintaining a personal bar inventory.
3. Provide trustworthy AI-assisted cocktail recommendations grounded in user inventory and canonical recipe data.
4. Deliver a polished, accessible cross-device experience with light and dark themes.

## 3. Non-Goals (Current Scope)

1. Social feed (friends and activity) is out of MVP scope.
2. Public cabinet showcase/profile discovery is out of MVP scope.
3. Multi-provider authentication is out of MVP scope (Google OAuth only).

## 4. Target Users

1. Casual home bartenders who want practical suggestions from existing bottles.
2. Enthusiasts who maintain a larger inventory and want quick recipe discovery.
3. Users who prefer conversational guidance over manual recipe search.

## 5. Core User Outcomes

1. A user can sign in with Google and persist a private bar inventory.
2. A user can ask an AI bartender what they can make right now.
3. A user can save cocktails they like and revisit them later.
4. A user can install the app (PWA baseline) and use core shell functionality on mobile.

## 6. Platform And Technology Decisions

1. Frontend/runtime: Next.js (App Router) + TypeScript.
2. Backend data/auth: PocketBase instance at https://bar-cart-pb.braican.com/.
3. Authentication: Google OAuth via PocketBase.
4. Hosting target: Netlify.
5. Dependency policy: minimal dependencies; additions require explicit justification.
6. Language policy: TypeScript-first; evaluate Go/Rust only when clear bottlenecks emerge.

## 7. UX And Visual Direction

1. Tone: high-class, modern, minimal; no prohibition-era retro aesthetic.
2. Typography: thin serif for display/brand; sturdier readable serif for body text.
3. Spacing: generous whitespace and restrained layout density.
4. Theming: full light mode and dark mode support from early slices.
5. Color system: simple palette with one bold accent color (deep emerald).
6. Motion: subtle only (small fades/staggers, restrained transitions).
7. Accessibility: maintain accessible contrast and focus visibility across both themes.

## 8. Functional Scope (MVP)

### 8.1 Authentication

1. Users can log in and log out using Google OAuth.
2. Unauthenticated users are gated from protected app screens.
3. Session state persists across refresh/reopen within expected auth lifetime.

### 8.2 Inventory Management

1. Users can create inventory entries manually via a simple form.
2. Users can view a list of their current bottles.
3. Users can edit and delete inventory entries.
4. Inventory is user-scoped and private by default.
5. Barcode scan import is tracked as a post-MVP enhancement unless low complexity emerges.

### 8.3 AI Bartender Interface

1. Users can chat with an AI assistant about what to make.
2. AI responses are conditioned on user inventory plus canonical cocktail data.
3. AI should provide practical recommendations and optionally alternatives when ingredients are missing.
4. AI cost controls are required in MVP (token/length constraints and basic usage limits).

### 8.4 Favorite Recipes

1. Users can save a cocktail as a favorite.
2. Users can view and remove favorites.
3. Favorites are tied to the authenticated user account.

### 8.5 PWA Baseline

1. App exposes installability metadata (manifest/icons/theme color).
2. Basic app shell/offline baseline is included.
3. Advanced offline conflict resolution is out of MVP scope.

## 9. AI Data Strategy

1. Canonical cocktail recipes should be maintained as first-party data (PocketBase collection).
2. LLM is used for reasoning, personalization, and conversational presentation.
3. Responses should be grounded in canonical recipes to reduce hallucination risk.
4. Optional bootstrapping: seed canonical recipe data from external source once, then serve from internal store.

## 10. Security And Privacy Baseline

1. Use PocketBase auth/session mechanisms; do not expose privileged keys to clients.
2. Store only necessary user data for inventory/favorites and app function.
3. Keep secrets in environment configuration, never in source control.
4. Design user data paths with least-privilege access assumptions.

## 11. Performance And Reliability Baseline

1. First usable load should feel fast on modern mobile and desktop networks.
2. Core interactions (inventory CRUD, favorites, chat send) should provide clear loading/error states.
3. Failures should be recoverable from UI without dead-end states.

## 12. Incremental Delivery Plan

### Slice A: Foundation

1. Next.js + TypeScript scaffold, env contract, PocketBase client wrapper, base shell, theme token setup, typography primitives.

### Slice B: Auth

1. Google OAuth flow, protected routes, session handling, auth edge states.

### Slice C: Inventory

1. Inventory schema integration, CRUD UI, validation and empty-state UX.

### Slice D: Favorites

1. Favorites persistence and list management.

### Slice E: AI Bartender

1. Chat UI, server-side provider wrapper, grounded context assembly, response guardrails.

### Slice F: PWA

1. Manifest/installability and minimal offline shell.

### Slice G: Hardening

1. Accessibility checks, targeted test coverage, dependency audit, and AI spend controls.

## 13. Acceptance Criteria Summary

1. A new user can sign in with Google and reach a protected app dashboard.
2. A signed-in user can add, edit, and remove inventory records.
3. AI can recommend cocktails informed by inventory and canonical recipes.
4. A user can save and remove favorites reliably.
5. App supports light/dark themes with accessible contrast.
6. App is installable as a PWA on supported devices.

## 14. Dependency Governance

1. Before adding a package, document: problem, no-package alternative, selected option, expected maintenance cost.
2. Review dependency list at each slice boundary.
3. Prefer browser/Next.js primitives unless a package clearly improves reliability or velocity.

## 15. Agent Collaboration Rules

1. Work incrementally by approved slice.
2. Do not create git commits automatically.
3. Surface package additions before adoption.
4. Keep scope aligned to approved MVP/non-goals.

## 16. Open Items For Next Doc Passes

1. Define exact PocketBase collections and field schema.
2. Define detailed route map and API/handler contracts.
3. Define AI provider selection matrix for cost/quality tradeoff.
4. Define test strategy depth and CI policy.
5. Define final font pair candidates and fallback stack.

## 17. Revision Metadata

1. Version: 0.1
2. Date: 2026-06-10
3. Status: Approved direction, implementation not started
4. Owner: Product/Engineering planning session
