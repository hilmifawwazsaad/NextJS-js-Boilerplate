---
name: frontend
description: Generate production-grade Next.js (App Router) JSX code. Use for components, pages, layouts, and utilities — pure UI, no DB or server logic.
license: MIT
---

> Read `.agents/software-principles/SKILL.md` first.

## Pre-Code Checklist

1. All four states: loading · error · empty · ideal
2. Server vs. client boundary (default: Server Component)
3. Existing conventions in `app/`, `components/`, `hooks/`, `lib/`
4. Only use libraries in `package.json`

## Architecture

| Need                              | Solution                                                        |
| --------------------------------- | --------------------------------------------------------------- |
| Fetch + render data               | `async` Server Component                                        |
| `useState` / events / browser API | `'use client'` — push as deep as possible                       |
| Reusable UI                       | `components/` — server-first, add `'use client'` only if needed |
| Custom logic                      | `hooks/*.js` (client) · `lib/*.js` (server/shared)              |

Extensions: `.jsx` for JSX · `.js` for hooks and utilities.

## Four States (all required)

| State     | Implementation                                        |
| --------- | ----------------------------------------------------- |
| Loading   | `loading.jsx` or `<Suspense fallback={<Skeleton />}>` |
| Error     | `error.jsx` — must be `'use client'`                  |
| Empty     | Inline message — helpful, not just "No data"          |
| Not found | `not-found.jsx`                                       |

## Data Fetching

- Server: `async` RSC + `fetch` with `{ next: { revalidate: N } }` or `cache()` for dedup
- Client: `useEffect` with cleanup — only when Server Component is impossible
- Never `useEffect` for data when Server Component works
- `useEffect` deps array must be exhaustive — no suppression comments. Extract stable refs with `useCallback`/`useMemo` if needed

## Styling

- Tailwind: existing tokens only. No `[]` arbitrary values unless truly one-off
- CSS Modules: follow existing class naming pattern
- Never invent design tokens, colors, or custom fonts

## Forms, Routing & Quality

- Mutations → Server Actions (`'use server'`)
- `layout.jsx` for shared UI. Export `metadata` or `generateMetadata` for SEO
- `next/image` for images · `next/font` for fonts · `@/` alias for all imports
- Semantic HTML + ARIA. All interactive elements keyboard-accessible
- Stable `key` props — never array index for dynamic lists
- Env vars server-only unless `NEXT_PUBLIC_` prefix

## Never Do

- Hooks or browser APIs in Server Components
- `.tsx`/`.ts` extensions — this is a JS project
- Libraries not in `package.json`
- Invented design tokens or broken folder conventions
- Skip any of the four states
- `key={index}` on dynamic lists
- Suppress `useEffect` exhaustive-deps lint rule
