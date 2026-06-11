# Bar Cart UI Design Brief (v0.1)

## 1. Design Intent

A premium, modern, minimal interface inspired by contemporary cocktail menus. Calm, refined, and intentional; no retro/prohibition styling.

## 2. Core Attributes

1. High-class
2. Modern
3. Minimal
4. Editorial
5. Calm confidence

## 3. Visual Principles

1. Restraint over decoration.
2. Whitespace is a primary design tool.
3. Typography carries hierarchy.
4. Accent color signals importance only.
5. Motion clarifies state, not style for style's sake.

## 4. Typography

### Role System

1. Display/brand: thin serif.
2. Body/content: sturdier readable serif.
3. Keep font family count low in MVP.

### Initial Scale (starting baseline)

1. Display XL: 56/60
2. Display L: 44/48
3. H1: 34/40
4. H2: 28/34
5. H3: 22/30
6. Body L: 18/30
7. Body M: 16/26
8. Body S: 14/22
9. Caption: 12/18

### Rules

1. Display styles reserved for page headers/hero moments.
2. Body styles prioritize readability and rhythm.
3. Maintain clean hierarchy at first glance.

## 5. Color and Theme

### Accent Direction

1. Single bold accent: deep emerald.

### Semantic Token Model

1. `--color-bg`
2. `--color-surface`
3. `--color-surface-elevated`
4. `--color-text-primary`
5. `--color-text-secondary`
6. `--color-border`
7. `--color-accent`
8. `--color-accent-contrast`
9. `--color-focus-ring`
10. `--color-success`
11. `--color-warning`
12. `--color-error`

### Theme Requirements

1. Full parity between light and dark for core components.
2. Dark theme must feel intentional, not simple inversion.
3. Text/control contrast meets WCAG AA baseline.

## 6. Spacing and Layout

1. Base spacing unit: 8.
2. Preferred rhythm: 8, 12, 16, 24, 32, 48, 64.
3. Favor generous vertical rhythm and controlled content width.
4. Avoid dense dashboard clutter.
5. Mobile-first without sacrificing visual breathing room.

## 7. Component Direction

### App Shell

1. Minimal chrome, clear hierarchy, consistent gutters.

### Cards/Panels

1. Subtle boundaries, restrained elevation, no heavy shadows.

### Forms

1. Clear persistent labels, concise helper/errors, stable layout under validation.

### Buttons

1. Primary uses accent.
2. Secondary/ghost remains neutral.
3. Destructive actions clearly differentiated.

### Chat UI

1. Readability-first thread layout.
2. Understated distinction between user/assistant turns.
3. Calm loading/streaming indicators.

## 8. Motion Guidelines

1. Motion level: subtle only.
2. Typical durations: 120ms to 220ms.
3. Prefer small opacity/translate transitions.
4. Respect reduced-motion preferences.
5. Avoid theatrical multi-step effects.

## 9. Accessibility Baseline

1. Keyboard operability across primary flows.
2. Visible focus indicators in both themes.
3. Semantic headings and labeled form controls.
4. Touch targets suitable for mobile.
5. Do not encode critical state with color alone.

## 10. Design QA Checklist (Per Slice)

1. Premium minimal tone preserved.
2. Typography hierarchy remains clear.
3. Whitespace rhythm remains consistent.
4. Accent usage is sparse and meaningful.
5. Light/dark parity is complete.
6. Contrast/focus/error states are clear.
7. Motion remains subtle and optional.

## 11. Slice A UI Deliverables

1. Token definitions for light and dark themes.
2. Typeface role mapping and scale primitives.
3. Foundational components:
4. Button (primary, secondary, ghost)
5. Input + label + error
6. Surface/card
7. Page heading block
8. Theme validation checklist evidence for mobile and desktop.

## 12. Metadata

1. Version: 0.1
2. Date: 2026-06-10
3. Status: Canonical planning baseline
