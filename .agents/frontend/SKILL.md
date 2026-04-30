---
name: frontend
description: Generate production-grade Next.js (App Router) code in JavaScript/JSX. Use for components, pages, layouts, and utilities inside an existing JSX boilerplate.
license: MIT
---

## Pre-Code Analysis

Before writing, identify: component states (loading/empty/error/ideal), data boundary (server vs client), and existing boilerplate conventions to follow.

## Core Rules

**Architecture**

- Default to Server Components; use `'use client'` only for interactivity (hooks, events, browser APIs) as deep in the tree as possible.
- All files with JSX use `.jsx`; hooks and utilities use `.js`.
- Follow existing folder conventions: `app/`, `components/`, `lib/`, `hooks/`, `ui/`.

**Data Fetching**

- Server: `async` RSC + `fetch` with `{ next: { revalidate } }` or `cache()`.
- Client: use boilerplate's library (`useSWR`, `@tanstack/react-query`) or a `useEffect` hook with cleanup. Never `useEffect` for data when a Server Component works.

**State Handling — always implement all four:**

- Loading → `loading.jsx` or `<Suspense>` fallback
- Error → `error.jsx` or error boundary
- Empty → clear, helpful message
- Not found → `not-found.jsx`

**Styling**

- Only use existing CSS variables/Tailwind tokens. No arbitrary values or invented tokens.
- CSS Modules: follow existing naming. Tailwind: reuse predefined classes; avoid `-[]` unless truly one-off.

**Forms & Routing**

- Mutations via Server Actions (`'use server'`). Validation with boilerplate's library (e.g., `zod`) if present.
- Layouts (`layout.jsx`) for shared UI. Export `metadata` or `generateMetadata` for SEO.

**Quality**

- Descriptive names; no abbreviations except `id`, `src`, `alt`.
- Imports via configured alias (`@/`).
- Keyboard-accessible interactive elements. Semantic HTML + ARIA.
- `next/image` for all images. `next/font` for fonts.
- Env vars server-only unless prefixed `NEXT_PUBLIC_`.
- Animation only for functional feedback; respect `prefers-reduced-motion`.

## Never Do

- Use hooks/browser APIs in Server Components.
- Invent design tokens, colors, or fonts.
- Skip any of the four states (loading/error/empty/not-found).
- Import libraries not in the boilerplate.
- Break folder/naming conventions.
