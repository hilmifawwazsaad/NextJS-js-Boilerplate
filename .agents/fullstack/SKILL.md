---
name: fullstack
description: Fullstack Next.js App Router JSX — UI + server logic in one repo. Use when task spans Server Components, Route Handlers, Server Actions, and/or DB. Not for pure UI (→ frontend) or external API servers (→ backend).
license: MIT
---

## Before Writing

Identify: server/client boundary, data origin (DB/API), mutation strategy, auth requirement, all states.

## Server/Client Boundary

| Need                               | Use                                                   |
| ---------------------------------- | ----------------------------------------------------- |
| Fetch & render data                | `async` Server Component                              |
| Form/page mutation                 | Server Action (`'use server'`) in `app/**/actions.js` |
| REST / webhook / public API        | Route Handler (`app/api/**/route.js`)                 |
| Interactivity, hooks, browser APIs | Client Component (`'use client'`) — push to leaves    |
| Shared logic                       | `lib/`, `services/`, `utils/`                         |

## Frontend Rules

- Server Components default; pass data as props to Client Components.
- `'use client'` only for `useState`, `useEffect`, events, browser APIs.
- Wrap heavy async RSC in `<Suspense>` with fallback.
- `.jsx` for JSX files, `.js` for hooks/utils.
- Four states required: loading (`loading.jsx`/Suspense), error (`error.jsx`), empty, not-found (`not-found.jsx`).
- `next/image` for images, `next/font` for fonts. Existing tokens only.

## Backend Rules

**Envelope** — Route Handlers return:

- Success: `{ success: true, data: <payload>, message: "OK", error: null }`
- Error: `{ success: false, data: null, message: "<summary>", error: { code, details: [{field, message}] } }`
- Codes: 200/201/204 · 422 validation · 401 unauth · 403 forbidden · 409 conflict · 500 (no stack trace)

**Server Actions** — return `{ success, data?, error?, errors? }`. Call `revalidatePath`/`revalidateTag` after mutations.

**Data layer** — DB in `lib/db.js` or `services/*.js`. Connection pooling. Parameterized queries/ORM only.

**Validation** — validate server-side before processing. Route Handlers: 422 + `error.details`; Server Actions: `{ success: false, errors }`.

## Security

- Secrets server-only. Never `NEXT_PUBLIC_` for sensitive values.
- Verify session/auth in every Server Action and Route Handler.
- Route protection via `middleware.js`.
- Parameterized queries. Hash passwords (bcrypt/argon2).
- Rate limit sensitive endpoints.

## Never Do

- DB queries or secrets in Client Components / `NEXT_PUBLIC_`.
- Trust unvalidated input.
- `useEffect` for data when RSC works.
- Pass sensitive data as props to Client Components (exposed in bundle).
- Skip any of the four states.
- Invent tokens or break conventions.
- Business logic in route handlers or page components.
