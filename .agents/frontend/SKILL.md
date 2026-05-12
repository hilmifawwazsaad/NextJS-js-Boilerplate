---
name: frontend
description: Next.js App Router JSX — components, pages, layouts, utilities in existing boilerplate.
license: MIT
---

## Before Writing

Check: states needed (loading/empty/error/not-found), server vs client boundary, existing conventions.

## Architecture

- Server Components default. `'use client'` only for hooks/events/browser APIs — push to leaves.
- `.jsx` for JSX files, `.js` for hooks/utils. Folders: `app/`, `components/`, `lib/`, `hooks/`, `ui/`.

## Data Fetching

- Server: `async` RSC + `fetch({ next: { revalidate } })` or `cache()`.
- Client: boilerplate library (`useSWR`/`@tanstack/react-query`) or `useEffect` with cleanup. Never `useEffect` when RSC works.

## States — all four required

- Loading → `loading.jsx` or Suspense fallback
- Error → `error.jsx` or error boundary
- Empty → clear helpful message
- Not found → `not-found.jsx`

## Styling

- Existing CSS variables/Tailwind tokens only. No arbitrary values or invented tokens.
- Tailwind: reuse predefined classes; `-[]` only if truly one-off.

## Forms & SEO

- Mutations via Server Actions (`'use server'`). Validate with `zod` if in boilerplate.
- `layout.jsx` for shared UI. Export `metadata`/`generateMetadata` for SEO.

## Quality

- Descriptive names; abbreviations only for `id`, `src`, `alt`. Imports via `@/`.
- Semantic HTML + ARIA. Keyboard accessible.
- `next/image` for images, `next/font` for fonts.
- Server-only env vars unless `NEXT_PUBLIC_`.
- Animation for functional feedback only; respect `prefers-reduced-motion`.

## Never Do

- Hooks/browser APIs in Server Components.
- Invent design tokens, colors, fonts. Import libraries not in boilerplate.
- Skip any of the four states. Break folder/naming conventions.
