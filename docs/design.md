# Bar Cart Technical Design (v0.1)

## 1. Architecture Summary

1. Next.js App Router + TypeScript for UI and server routes.
2. PocketBase for auth and primary data store.
3. AI provider accessed only from server route handlers.
4. Netlify as deployment target.
5. TypeScript-first; Go/Rust deferred unless clear bottleneck emerges.

## 1.b Development Environment

- Package manager: npm
- Node runtime 24.16 (read from the .nvmrc file)

## 2. Runtime Boundaries

### Client Responsibilities

1. Render routes/components and handle UI state.
2. Use PocketBase auth/session state for protected navigation.
3. Call server API for AI chat.

### Server Responsibilities

1. Mediate AI requests.
2. Assemble grounded context from user inventory + canonical cocktails.
3. Enforce input/output limits and fallback handling.

### PocketBase Responsibilities

1. Google OAuth auth and session model.
2. User-scoped persistence for inventory/favorites.
3. Canonical cocktail data serving.

## 3. Route Map

### Public

1. `/login`

### Protected

1. `/` (dashboard)
2. `/inventory`
3. `/favorites`
4. `/bartender`

### Server API

1. `POST /api/ai/chat`
2. Optional later: `GET /api/health`

## 4. Data Model (PocketBase)

### users

1. PocketBase auth collection (default).

### inventory_items

Fields:

1. `owner` relation to users (required, indexed)
2. `name` string (required)
3. `category` string (optional but recommended)
4. `brand` string (optional)
5. `volume_ml` number (optional)
6. `quantity` number (default 1)
7. `notes` text (optional)
8. `created`, `updated` timestamps (auto)

Rules:

1. Owner-scoped read/write/delete.
2. Create requires authenticated user and owner binding.

### cocktails

Fields:

1. `name` string (required, indexed)
2. `ingredients_json` json (required)
3. `instructions` text (required)
4. `tags` array/string (optional)
5. `source` string (optional)
6. `is_active` bool (default true)
7. `created`, `updated` timestamps (auto)

Rules:

1. Authenticated read.
2. Restricted write (admin/maintainer path only).

### favorite_cocktails

Fields:

1. `owner` relation to users (required, indexed)
2. `cocktail` relation to cocktails (required, indexed)
3. `created` timestamp (auto)

Constraints/rules:

1. Unique composite on owner + cocktail.
2. Owner-scoped CRUD.

### Optional (deferred): chat_sessions and chat_messages

Not required for MVP baseline unless conversation persistence is prioritized.

## 5. Auth Lifecycle

1. User starts Google sign-in on login route.
2. PocketBase OAuth completes; session stored in auth store.
3. Protected layout checks session and redirects guests.
4. Logout clears auth store and returns to login.
5. Expired session forces re-auth without broken route state.

## 6. AI Chat Flow

1. Client sends prompt to `POST /api/ai/chat`.
2. Server verifies authenticated user.
3. Server validates prompt length/shape.
4. Server fetches user inventory + candidate canonical cocktails.
5. Server builds grounded prompt context.
6. Server calls low-cost AI model.
7. Server validates/sanitizes response and returns structured payload.
8. Client renders result with clear error/retry handling.

### Initial response shape

1. `summary_text`
2. `recommended_cocktails` (name, rationale, missing ingredients)
3. `follow_up_question` (optional)
4. `grounding_confidence` (low/medium/high)

## 7. API Contract

### POST /api/ai/chat

Request:

1. `message` string (required)
2. `sessionId` string (optional)

Responses:

1. `200` structured assistant reply
2. `400` invalid input
3. `401` unauthenticated
4. `429` capped/rate-limited
5. `500` provider/internal failure with retry-safe message

## 8. PWA Baseline

1. Manifest with name, icons, theme color, start URL, display mode.
2. Minimal offline shell support after first load.
3. Clear offline messaging for network-required actions.
4. Advanced sync/conflict resolution deferred.

## 9. Theme/Design System Integration

1. Semantic tokens for surfaces/text/border/accent/state.
2. Light/dark parity for all core components.
3. Accent (deep emerald) used intentionally, not globally.
4. Serif-led typography primitives from slice A onward.

## 10. Security Notes

1. AI provider secret is server-only.
2. Collection rules enforce user isolation.
3. Validate and sanitize API inputs/outputs.
4. Avoid logging sensitive user content where unnecessary.

## 11. Dependency Strategy

Baseline:

1. `next`
2. `react`
3. `react-dom`
4. `pocketbase`

Deferred unless justified:

1. Form/state helper libs
2. Data-cache libraries
3. PWA helper plugins
4. Animation libraries

## 12. Slice Dependency Graph

1. Slice A blocks all subsequent slices.
2. Slice B required before production-like testing of C/D/E.
3. Slices C and D can run in parallel after B.
4. Slice E depends on B + inventory baseline from C.
5. Slice F can run parallel after shell exists.
6. Slice G after core feature stabilization.

## 13. Slice A Execution Checklist

1. Scaffold Next.js + TypeScript strict mode.
2. Define env contract:
3. `NEXT_PUBLIC_POCKETBASE_URL`
4. `NEXT_PUBLIC_APP_URL`
5. `AI_PROVIDER_API_KEY` (server-only)
6. Add PocketBase client/auth helpers.
7. Add public/protected layout scaffolding.
8. Add baseline theme tokens + typography primitives.
9. Add login placeholder with Google sign-in trigger.
10. Add protected dashboard placeholder.
11. Add loading/error UI primitives.
12. Validate auth gate + theme parity in smoke pass.

## 14. Metadata

1. Version: 0.1
2. Date: 2026-06-10
3. Status: Canonical planning baseline
