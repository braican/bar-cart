# Bar Cart Requirements (v0.1)

## 1. Purpose

Defines functional and non-functional requirements for Bar Cart MVP with testable acceptance criteria.

## 2. Scope

### 2.1 In Scope (MVP)

1. Google OAuth authentication via PocketBase.
2. User-scoped inventory CRUD.
3. AI bartender chat with inventory-aware recommendations.
4. Favorite cocktail save/remove flows.
5. PWA baseline (installability + minimal offline shell).
6. Light and dark themes with accessible contrast.
7. Incremental feature-slice delivery with dependency governance.

### 2.2 Out of Scope (MVP)

1. Social feed and friend activity.
2. Public cabinet showcase.
3. Multi-provider authentication.
4. Advanced offline conflict resolution.
5. Barcode scan ingestion flow (deferred).

## 3. Functional Requirements

### FR-AUTH-001 Login

System shall authenticate users through Google OAuth via PocketBase.

Acceptance criteria:

1. Guest can initiate Google sign-in from login screen.
2. Successful auth redirects to authenticated home/dashboard.
3. Failed auth shows recoverable error and retry option.

### FR-AUTH-002 Logout

System shall allow authenticated users to log out.

Acceptance criteria:

1. Logout clears session/auth state.
2. Protected routes require re-authentication after logout.

### FR-AUTH-003 Route Protection

System shall gate protected routes to authenticated users only.

Acceptance criteria:

1. Guest access to protected routes redirects to login.
2. Valid session is restored on refresh/reopen.

### FR-INV-001 Create Inventory Item

System shall allow manual creation of bottle records.

Acceptance criteria:

1. Required fields validate before submission.
2. Created record is user-scoped.
3. Successful create updates visible list state.

### FR-INV-002 Read Inventory

System shall list current user inventory only.

Acceptance criteria:

1. Only owner records are shown.
2. Empty state appears when no records exist.

### FR-INV-003 Update Inventory

System shall allow editing existing inventory records.

Acceptance criteria:

1. Edit form pre-populates current values.
2. Saved update reflects in list/detail UI.

### FR-INV-004 Delete Inventory

System shall allow deletion of inventory records.

Acceptance criteria:

1. Delete action requires confirmation.
2. Deleted record is removed from visible list.

### FR-INV-005 Barcode (Deferred)

Barcode ingestion is deferred post-MVP.

Acceptance criteria:

1. MVP ships without partial/unfinished scan flow.
2. Enhancement is documented in backlog.

### FR-AI-001 Chat Interface

System shall provide conversational AI bartender UI.

Acceptance criteria:

1. Authenticated user can submit prompts and receive replies.
2. UI handles pending/success/error states per message.

### FR-AI-002 Grounded Recommendations

AI responses shall be grounded in canonical recipe data and user inventory.

Acceptance criteria:

1. AI request context includes user inventory snapshot.
2. AI request context includes canonical recipe candidates.
3. Reply includes either feasible recommendations or explicit missing ingredients.

### FR-AI-003 Cost Controls

System shall enforce basic AI usage controls.

Acceptance criteria:

1. Prompt length cap enforced server-side.
2. Output/token cap enforced server-side.
3. User sees limit-exceeded or retry guidance when applicable.

### FR-AI-004 Hallucination Mitigation

System shall avoid presenting fabricated recipes as authoritative.

Acceptance criteria:

1. Low-confidence situations trigger clarification or constrained alternatives.
2. If no grounded match exists, response says so and suggests nearest options.

### FR-FAV-001 Save Favorite

System shall allow saving cocktails as favorites.

Acceptance criteria:

1. Save creates user-scoped favorite record.
2. Duplicate save is idempotent or clearly rejected.

### FR-FAV-002 Remove Favorite

System shall allow listing/removing favorites.

Acceptance criteria:

1. Favorites list includes only owner records.
2. Remove updates persistence and UI consistently.

### FR-PWA-001 Installability

System shall include PWA manifest and required metadata.

Acceptance criteria:

1. Valid manifest and icon set present.
2. Install prompt behavior works on supported browsers/devices.

### FR-PWA-002 Offline Shell

System shall provide minimal offline shell behavior.

Acceptance criteria:

1. Core shell can render after prior load even when offline.
2. Offline state messaging is visible for network-dependent actions.

## 4. UX and Design Requirements

### UX-DES-001 Visual Tone

Premium, modern, minimal; no prohibition-era retro style.

Acceptance criteria:

1. No vintage decorative motifs.
2. Layout preserves generous whitespace and restraint.

### UX-DES-002 Typography

Serif-led hierarchy.

Acceptance criteria:

1. Thin serif for display/brand usage.
2. Sturdier readable serif for body/content.
3. Initial font loading via webfont CDN is acceptable.

### UX-DES-003 Color

Simple palette with one bold accent (deep emerald).

Acceptance criteria:

1. Accent used sparingly and intentionally.
2. Text/control contrast meets WCAG AA baseline.

### UX-DES-004 Themes

System supports light and dark mode parity.

Acceptance criteria:

1. Core surfaces/components work in both themes.
2. Theme switch preserves readability and interaction clarity.

### UX-DES-005 Motion

Motion remains subtle.

Acceptance criteria:

1. Small, restrained transitions only.
2. Motion is not required for task comprehension.

## 5. Non-Functional Requirements

### NFR-SEC-001 Secrets

Secrets shall not be exposed to client bundle.

Acceptance criteria:

1. AI keys used server-side only.
2. No plaintext secrets in source control.

### NFR-SEC-002 Data Isolation

User data access must be owner-scoped.

Acceptance criteria:

1. Inventory/favorites reads and writes are owner-constrained.
2. Cross-user access is denied by rules.

### NFR-PERF-001 Startup Performance

App shell should feel fast on modern mobile/desktop.

Acceptance criteria:

1. Avoid unnecessary heavy dependencies.
2. UI presents immediate feedback for user actions.

### NFR-REL-001 Recoverability

Failures shall be recoverable in UI.

Acceptance criteria:

1. Retry path available for key failures.
2. No dead-end error states for core flows.

### NFR-A11Y-001 Accessibility Baseline

Primary flows must be keyboard-usable with visible focus and proper labels.

Acceptance criteria:

1. Keyboard navigation works for auth, inventory, favorites, chat.
2. Focus indicators and semantic form labels are present.

## 6. Dependency Governance

1. Any new package requires a short decision note: problem, no-package option, chosen path, rationale.
2. Dependency audit occurs at each slice boundary.
3. Prefer framework/platform primitives unless package value is clear.

## 7. Validation by Slice

1. Slice A: foundation, theme tokens, env contract.
2. Slice B: auth flow and route protection.
3. Slice C: inventory CRUD + user scoping.
4. Slice D: favorites behavior and idempotency.
5. Slice E: grounded AI + limits + failure handling.
6. Slice F: installability + offline shell baseline.
7. Slice G: accessibility, reliability, dependency hygiene.

## 8. Metadata

1. Version: 0.1
2. Date: 2026-06-10
3. Status: Canonical planning baseline
